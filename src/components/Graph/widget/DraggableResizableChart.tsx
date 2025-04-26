import React, { useRef } from 'react';
import { useDrag, DragSourceMonitor, ConnectDragSource } from 'react-dnd';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { useTheme } from '~/components/Graph/context/ThemeContext';

interface DraggableResizableChartProps {
  id: string | number;
  left: number;
  top: number;
  width: number;
  height: number;
  onResizeStop: (id: string | number, size: { width: number; height: number }) => void;
  onDragStop: (id: string | number, pos: { left: number; top: number }) => void;
  children: React.ReactNode;
  grid?: [number, number]; // Optional grid snapping for dragging
  bounds?: { left?: number; top?: number; right?: number; bottom?: number }; // Optional boundaries
}

// Define an ItemType for dnd
export const ItemTypes = {
  CHART: 'chart',
};

// Type for the item being dragged
interface ChartDragItem {
    id: string | number;
    left: number;
    top: number;
    type: typeof ItemTypes.CHART; // Explicitly use the defined type string
}

const DraggableResizableChart: React.FC<DraggableResizableChartProps> = ({
  id,
  left,
  top,
  width,
  height,
  onResizeStop,
  onDragStop,
  children,
  grid = [10, 10], // Set default grid snap to 10px
  bounds = {},   // Default no bounds
}) => {
  // Get theme context
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Ref for accessing the draggable element's dimensions/position
  const elementRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag<ChartDragItem, void, { isDragging: boolean }>(() => ({
    type: ItemTypes.CHART,
    item: { id, left, top, type: ItemTypes.CHART }, // Ensure item matches ChartDragItem
    end: (item, monitor) => { // item type is now correctly inferred as ChartDragItem
      const delta = monitor.getDifferenceFromInitialOffset();
      if (!delta || !item) return;

      let newLeft = Math.round(item.left + delta.x);
      let newTop = Math.round(item.top + delta.y);

      // Apply grid snapping
      newLeft = Math.round(newLeft / grid[0]) * grid[0];
      newTop = Math.round(newTop / grid[1]) * grid[1];

      // Get parent bounds if available (use elementRef)
      const parentElement = elementRef.current?.offsetParent as HTMLElement | null;
      const parentWidth = parentElement?.clientWidth ?? window.innerWidth;
      const parentHeight = parentElement?.clientHeight ?? window.innerHeight;

      const rightBound = Math.min(bounds.right ?? Infinity, parentWidth) - width;
      const bottomBound = Math.min(bounds.bottom ?? Infinity, parentHeight) - height;

      newLeft = Math.max(bounds.left ?? 0, newLeft);
      newTop = Math.max(bounds.top ?? 0, newTop);
      newLeft = Math.min(rightBound, newLeft);
      newTop = Math.min(bottomBound, newTop);

      if (bounds.left === undefined) newLeft = Math.max(0, newLeft);
      if (bounds.top === undefined) newTop = Math.max(0, newTop);

      onDragStop(item.id, { left: newLeft, top: newTop });
    },
    collect: (monitor: DragSourceMonitor<ChartDragItem, void>) => ({ // Explicitly type the monitor
      isDragging: monitor.isDragging(),
    }),
  }), [id, left, top, width, height, grid, bounds, onDragStop]);

  // Combine refs: dnd's drag connector and our elementRef
  const combinedRef = (node: HTMLDivElement | null) => {
    if (node) {
        drag(node); // Apply dnd connector
        (elementRef as React.MutableRefObject<HTMLDivElement | null>).current = node; // Assign to our ref
    }
  };

  // Style for the outer draggable div
  const outerStyle: React.CSSProperties = {
    position: 'absolute',
    left: left,
    top: top,
    opacity: isDragging ? 0.6 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
    zIndex: isDragging ? 1000 : 1, // Bring to front when dragging
    // width and height are controlled by ResizableBox
  };

  // Style for the inner content div
  const innerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    border: '1px solid #ddd',
    background: isDark ? '#374151' : 'white', // Adapt background to theme
    color: isDark ? 'white' : 'black', // Adapt text color to theme
    boxShadow: `0 4px 10px rgba(0,0,0,${isDark ? '0.4' : '0.1'})`, // Adapt shadow
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '8px', // Add rounded corners
    transition: 'box-shadow 0.3s ease, background-color 0.3s ease', // Smooth transitions
  };

  const handleResizeStop: ResizableBoxProps['onResizeStop'] = (e, data) => {
    const parentElement = elementRef.current?.offsetParent as HTMLElement | null;
    const parentWidth = parentElement?.clientWidth ?? window.innerWidth;
    const parentHeight = parentElement?.clientHeight ?? window.innerHeight;

    let newWidth = data.size.width;
    let newHeight = data.size.height;

    // Apply bounds
    const maxPossibleWidth = Math.min(bounds.right ?? Infinity, parentWidth) - left;
    const maxPossibleHeight = Math.min(bounds.bottom ?? Infinity, parentHeight) - top;

    newWidth = Math.min(newWidth, maxPossibleWidth);
    newHeight = Math.min(newHeight, maxPossibleHeight);

    const minConstraints = [150, 100];
    newWidth = Math.max(minConstraints[0], newWidth);
    newHeight = Math.max(minConstraints[1], newHeight);

    onResizeStop(id, { width: newWidth, height: newHeight });
  };

  return (
    <div ref={combinedRef} style={outerStyle} data-chart-id={id}>
      <ResizableBox
        width={width}
        height={height}
        minConstraints={[150, 100]}
        maxConstraints={[Infinity, Infinity]}
        onResizeStop={handleResizeStop}
        draggableOpts={{ grid: [10, 10] }}
        className={`box react-resizable ${isDark ? 'bg-gray-700' : 'bg-white'}`}
        handle={(
          <span
            className="react-resizable-handle react-resizable-handle-se"
            style={{
              // Basic styling for the handle, adjust as needed
              width: '15px',
              height: '15px',
              background: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
              display: 'block',
              position: 'absolute',
              bottom: '0px',
              right: '0px',
              cursor: 'se-resize',
              borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}`, // Visual aid
              borderLeft: `1px solid ${isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}`, // Visual aid
              borderRadius: '3px 0 0 0'
            }}
          />
        )}
      >
        <div style={innerStyle}>
          {/* Optional: Add a styled header for dragging */}
          <div style={{
              height: '25px',
              background: isDark ? '#4b5563' : '#e5e7eb',
              cursor: 'grab',
              textAlign: 'center',
              lineHeight: '25px',
              borderBottom: `1px solid ${isDark ? '#6b7280' : '#d1d5db'}`,
              borderTopLeftRadius: '8px', // Match parent border radius
              borderTopRightRadius: '8px',
              fontSize: '12px',
              fontWeight: 'bold',
              color: isDark ? '#e5e7eb' : '#374151'
            }} >
             {/* You could display the chart title or ID here */}
             Chart {id}
          </div>
          <div style={{ flexGrow: 1, overflow: 'auto', padding: '10px' }}>
            {children}
          </div>
        </div>
      </ResizableBox>
    </div>
  );
};

export default DraggableResizableChart; 