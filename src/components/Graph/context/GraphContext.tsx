import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DashboardConfig } from '~/components/Graph/types/charts';
import { GraphComponentOptions } from '../types';
import dashboardConfigs from '../dashboards';

// 图表上下文状态接口
interface GraphContextState {
  currentDashboard: DashboardConfig | null;
  options: GraphComponentOptions;
  isLoading: boolean;
  error: Error | null;
}

// 图表上下文操作接口
interface GraphContextActions {
  setDashboard: (dashboardId: string | number) => void;
  updateOptions: (options: Partial<GraphComponentOptions>) => void;
  resetDashboard: () => void;
}

// 图表上下文接口
interface GraphContextValue extends GraphContextState, GraphContextActions {}

// 创建上下文
const GraphContext = createContext<GraphContextValue | undefined>(undefined);

// 默认选项
const defaultOptions: GraphComponentOptions = {
  theme: 'light',
  responsive: true,
  refreshInterval: 0,
  showControls: true
};

// 上下文提供者Props
interface GraphContextProviderProps {
  children: ReactNode;
  initialDashboardId?: string | number;
  initialOptions?: Partial<GraphComponentOptions>;
}

// 上下文提供者组件
export const GraphContextProvider: React.FC<GraphContextProviderProps> = ({
  children,
  initialDashboardId = 'default',
  initialOptions = {}
}) => {
  // 状态
  const [currentDashboard, setCurrentDashboard] = useState<DashboardConfig | null>(
    dashboardConfigs[initialDashboardId] || dashboardConfigs['default']
  );
  const [options, setOptions] = useState<GraphComponentOptions>({
    ...defaultOptions,
    ...initialOptions
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // 操作
  const setDashboard = (dashboardId: string | number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const dashboard = dashboardConfigs[dashboardId];
      if (!dashboard) {
        throw new Error(`Dashboard with ID ${dashboardId} not found`);
      }
      
      setCurrentDashboard(dashboard);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  };

  const updateOptions = (newOptions: Partial<GraphComponentOptions>) => {
    setOptions(prev => ({ ...prev, ...newOptions }));
  };

  const resetDashboard = () => {
    setCurrentDashboard(dashboardConfigs['default']);
    setOptions(defaultOptions);
    setError(null);
  };

  // 上下文值
  const contextValue: GraphContextValue = {
    currentDashboard,
    options,
    isLoading,
    error,
    setDashboard,
    updateOptions,
    resetDashboard
  };

  return (
    <GraphContext.Provider value={contextValue}>
      {children}
    </GraphContext.Provider>
  );
};

// 自定义Hook，用于访问图表上下文
export const useGraphContext = (): GraphContextValue => {
  const context = useContext(GraphContext);
  
  if (context === undefined) {
    throw new Error('useGraphContext must be used within a GraphContextProvider');
  }
  
  return context;
}; 