import QueryEnabledChart from './QueryEnabledChart';
import { DashboardConfig, ChartConfig } from '~/components/Graph/types/charts';
import { useTheme } from '~/components/Graph/context/ThemeContext';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  UniqueIdentifier,
  useDroppable,
  DragStartEvent,
  MeasuringStrategy,
  DropAnimation,
  defaultDropAnimation,
  DragOverEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, PlusCircle, Loader2 } from 'lucide-react';

const findContainer = (items: SortableChartConfig[][], id: UniqueIdentifier | undefined): number | undefined => {
  if (!id) {
    return undefined;
  }
  for (let i = 0; i < items.length; i++) {
    if (items[i].some(item => item.id === id)) {
      return i;
    }
  }
  return undefined;
};

interface SortableChartConfig extends ChartConfig {
  id: string;
}

const dropAnimation: DropAnimation = {
  ...defaultDropAnimation,
  duration: 300,
  easing: 'cubic-bezier(0.2, 0, 0.1, 1)',
};

const centerStyle = ({ transform }: any) => {
  return {
    ...transform,
    x: transform.x,
    y: transform.y,
    scaleX: 1,
    scaleY: 1,
  };
};

const getLayoutStorageKey = (dashboardId: string | number) => `graph-layout-${dashboardId}`;

function NewRowDropZone({ isDark, isOver }: { isDark: boolean, isOver: boolean }) {
  const { setNodeRef } = useDroppable({
    id: 'new-row-drop-zone',
  });
  
  return (
    <div 
      ref={setNodeRef}
      className={`mt-6 border-2 border-dashed rounded-lg flex items-center justify-center h-32 transition-colors ${
        isOver 
          ? (isDark ? 'bg-blue-900/30 border-blue-500' : 'bg-blue-100 border-blue-500') 
          : (isDark ? 'border-gray-700 bg-gray-800/20' : 'border-gray-300 bg-gray-100/50')
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <PlusCircle className={`mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {isOver ? '松开创建新行' : '拖到这里创建新行'}
        </p>
      </div>
    </div>
  );
}

function RowContainer({ id, children, isDark, isOver }: { id: string, children: React.ReactNode, isDark: boolean, isOver: boolean }) {
  const { setNodeRef } = useDroppable({
    id: `row-${id}`,
  });
  
  return (
    <div 
      ref={setNodeRef}
      data-row-container
      className={`flex flex-row gap-6 w-full p-3 rounded-lg transition-colors ${
        isOver 
          ? (isDark ? 'bg-blue-900/20' : 'bg-blue-100/50') 
          : ''
      } ${isDark ? 'hover:bg-gray-800/50' : 'hover:bg-gray-100/70'} min-h-[550px]`}
    >
      {children}
    </div>
  );
}

function SortableItem({ id, config, isDark, itemsInRow }: { id: string, config: ChartConfig, isDark: boolean, itemsInRow: number }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id,
    data: {
      type: 'chart',
      config
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={`flex-1 relative rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} 
          shadow-md border ${isDark ? 'border-gray-700' : 'border-gray-200'} overflow-hidden min-h-[500px]`}
    >
      <button
        {...attributes} 
        {...listeners}
        className={`absolute top-2 right-2 z-10 p-1 rounded cursor-grab ${isDark ? 'text-gray-400 bg-gray-800 hover:bg-gray-700' : 'text-gray-500 bg-white hover:bg-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
        aria-label="Drag handle"
        onClick={(e) => e.stopPropagation()}
      >
        <GripVertical size={18} /> 
      </button>
      <div className="h-full w-full p-4">
        <QueryEnabledChart config={config} />
      </div>
    </div>
  );
}

// Main Dashboard Component
function Dashboard({ config }: { config: DashboardConfig }) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    
    const [items, setItems] = useState<SortableChartConfig[][]>([]);
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const [isOverNewRowZone, setIsOverNewRowZone] = useState(false);
    const [currentContainer, setCurrentContainer] = useState<string | null>(null);
    
    const startingRowRef = useRef<number | null>(null);
    const [layoutChangeId, setLayoutChangeId] = useState(0);
    const [isLoadingLayout, setIsLoadingLayout] = useState(true);

    useEffect(() => {
      const dashboardId = config.id || 'default';
      const storageKey = getLayoutStorageKey(dashboardId);
      
      try {
        const savedLayout = localStorage.getItem(storageKey);
        
        if (savedLayout) {
          const parsedLayout = JSON.parse(savedLayout) as SortableChartConfig[][];
          
          const savedChartIds = new Set(parsedLayout.flat().map(item => item.id));
          const configChartIds = config.charts.map(chart => getChartId(chart));
          const allChartsPresent = configChartIds.every(id => savedChartIds.has(id));
          const hasValidLayout = parsedLayout.length > 0 && parsedLayout.every(row => row.length > 0);
          
          if (allChartsPresent && hasValidLayout) {
            setItems(parsedLayout);
            setIsLoadingLayout(false);
            return;
          }
        }
      } catch (error) {
        console.warn('Error loading saved layout:', error);
      }
      
      setItems(config.charts.map(chart => [{
        ...chart, 
        id: getChartId(chart) 
      }]));
      setIsLoadingLayout(false);
    }, [config.charts, config.id]);

    useEffect(() => {
      if (items.length > 0) {
        const dashboardId = config.id || 'default';
        const storageKey = getLayoutStorageKey(dashboardId);
        
        try {
          localStorage.setItem(storageKey, JSON.stringify(items));
        } catch (error) {
          console.warn('Error saving layout to localStorage:', error);
        }
      }
    }, [items, config.id]);

    const flattenedItems = useMemo(() => items.flat(), [items]);

    const sensors = useSensors(
      useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
      useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    function handleDragStart(event: DragStartEvent) {
      const { active } = event;
      const activeId = active.id;
      setActiveId(activeId);

      const rowIndex = findContainer(items, activeId);
      startingRowRef.current = rowIndex !== undefined ? rowIndex : null;

      if (rowIndex !== undefined) {
        setCurrentContainer(`row-${rowIndex}`);
      } else {
        setCurrentContainer(null);
      }
    }

    function handleDragOver(event: DragOverEvent) {
      const { over } = event;
      const overId = over?.id;

      if (overId === 'new-row-drop-zone') {
        setIsOverNewRowZone(true);
        setCurrentContainer(null);
      } else {
        setIsOverNewRowZone(false);
        if (typeof overId === 'string' && overId.startsWith('row-')) {
          setCurrentContainer(overId);
        } else {
          const overContainerIndex = findContainer(items, overId);
          if (overContainerIndex !== undefined) {
            setCurrentContainer(`row-${overContainerIndex}`);
          } else if (currentContainer !== null && overId !== activeId) {
          } else {
            setCurrentContainer(null);
          }
        }
      }
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        const activeId = active.id;
        const overId = over?.id;

        setActiveId(null);
        setIsOverNewRowZone(false);
        setCurrentContainer(null);

        if (overId === 'new-row-drop-zone' && activeId) {
            const activeContainerIndex = findContainer(items, activeId);

            if (activeContainerIndex !== undefined) {
                setItems((prevItems) => {
                    const newItems = [...prevItems];
                    const activeRow = [...newItems[activeContainerIndex]];
                    const activeItemIndex = activeRow.findIndex(item => item.id === activeId);
                    if (activeItemIndex === -1) return prevItems;
                    const [movedItem] = activeRow.splice(activeItemIndex, 1);
                    newItems[activeContainerIndex] = activeRow;
                    newItems.push([movedItem]);
                    return newItems.filter(row => row.length > 0);
                });
                setLayoutChangeId(prevId => prevId + 1);
                return;
            }
        }

        if (typeof overId === 'string' && overId.startsWith('row-')) {
            const activeContainerIndex = findContainer(items, activeId);
            if (activeContainerIndex !== undefined) {
                const overContainerIndex = parseInt(overId.replace('row-', ''), 10);
                setItems((prevItems) => {
                    const newItems = [...prevItems];
                    const activeRow = [...newItems[activeContainerIndex]];
                    const activeItemIndex = activeRow.findIndex(item => item.id === activeId);
                    if (activeItemIndex === -1) return prevItems;
                    const [movedItem] = activeRow.splice(activeItemIndex, 1);
                    newItems[activeContainerIndex] = activeRow;
                    newItems[overContainerIndex].push(movedItem);
                    return newItems.filter(row => row.length > 0);
                });
                setLayoutChangeId(prevId => prevId + 1);
                return;
            }
        }

        if (!overId || activeId === overId) {
            return;
        }

        const activeContainerIndex = findContainer(items, activeId);
        const overContainerIndex = findContainer(items, overId);

        if (
            activeContainerIndex !== undefined &&
            overContainerIndex !== undefined
        ) {
            if (activeContainerIndex !== overContainerIndex) {
                setItems((prevItems) => {
                    const newItems = [...prevItems];
                    const activeRow = [...newItems[activeContainerIndex]];
                    const overRow = [...newItems[overContainerIndex]];
                    const activeItemIndex = activeRow.findIndex(item => item.id === activeId);
                    const [movedItem] = activeRow.splice(activeItemIndex, 1);
                    overRow.push(movedItem);
                    newItems[activeContainerIndex] = activeRow;
                    newItems[overContainerIndex] = overRow;
                    return newItems.filter(row => row.length > 0);
                });
                setLayoutChangeId(prevId => prevId + 1);
            } else {
                setItems((prevItems) => {
                    const activeRow = prevItems[activeContainerIndex];
                    const activeItemIndex = activeRow?.findIndex(item => item.id === activeId);
                    const overItemIndex = activeRow?.findIndex(item => item.id === overId);

                    if (activeItemIndex !== undefined && overItemIndex !== undefined && activeItemIndex !== overItemIndex) {
                        const newItems = [...prevItems];
                        newItems[activeContainerIndex] = arrayMove(prevItems[activeContainerIndex], activeItemIndex, overItemIndex);
                        return newItems;
                    }
                    return prevItems;
                });
            }
        } else {
           console.log("Dropped outside a valid target or indices not found.");
        }
    }

    const activeItemConfig = useMemo(() => {
      if (!activeId) return null;
      return flattenedItems.find(item => item.id === activeId);
    }, [activeId, flattenedItems]);

    const getChartId = (chart: ChartConfig) => {
      return chart.title || `chart-${chart.chartType}`;
    };

    if (isLoadingLayout) {
      return (
        <div className="flex justify-center items-center min-h-[600px] w-full">
          <Loader2 
            className={`h-18 w-12 animate-spin ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
            strokeWidth={4.5}
          />
        </div>
      );
    }

    return (
        <div className={`w-full pr-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
            {/* Header */}
            <div className="mb-6 px-4">
                <div className="flex items-center gap-3">
                    <h4 className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                        {config.title}
                    </h4>
                    {config.description && (
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {config.description}
                        </p>
                    )}
                </div>
                <div className={`mt-3 h-1 w-20 rounded ${isDark ? 'bg-blue-500' : 'bg-blue-600'}`} />
            </div>
            
            {/* Charts Area */}
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              measuring={{
                droppable: {
                  strategy: MeasuringStrategy.Always,
                },
              }}
              autoScroll={{ threshold: { x: 0.1, y: 0.1 } }}
            >
              <div className="flex flex-col gap-10 w-full">
                {items.map((rowItems, rowIndex) => (
                  <RowContainer 
                    key={`row-${rowIndex}-${layoutChangeId}`} 
                    id={String(rowIndex)}
                    isDark={isDark}
                    isOver={currentContainer === `row-${rowIndex}`}
                  >
                    <SortableContext 
                      items={rowItems.map(item => item.id)} 
                      strategy={horizontalListSortingStrategy}
                    >
                      {rowItems.map((item) => (
                        <SortableItem 
                          key={`${item.id}-${layoutChangeId}`} 
                          id={item.id} 
                          config={item} 
                          isDark={isDark}
                          itemsInRow={rowItems.length}
                        />
                      ))}
                    </SortableContext>
                  </RowContainer>
                ))}
                
                {/* New row drop zone */}
                <NewRowDropZone isDark={isDark} isOver={isOverNewRowZone} />
              </div>
              
              <DragOverlay dropAnimation={dropAnimation} modifiers={[centerStyle]}>
                {activeId && activeItemConfig ? (
                   <div className={`opacity-90 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} 
                       shadow-lg border ${isDark ? 'border-gray-600' : 'border-gray-300'} overflow-visible 
                       flex items-center justify-center transform-origin-center min-h-[500px] w-auto h-auto`}> 
                     <div className="h-full w-full p-4 overflow-visible">
                       <QueryEnabledChart config={activeItemConfig} />
                     </div>
                   </div>
                ) : null}
              </DragOverlay>
            </DndContext>
        </div>
    );
}

export default Dashboard; 