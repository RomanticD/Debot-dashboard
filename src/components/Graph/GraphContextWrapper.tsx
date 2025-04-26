import React, { ReactNode } from 'react';
import { GraphContextProvider } from './context/GraphContext';
import { useTheme } from './context/ThemeContext';

interface GraphContextWrapperProps {
  children: ReactNode;
  initialDashboardId?: string | number;
}

/**
 * A wrapper component that connects the theme context with the graph context
 * This ensures all Graph components have access to the theme and graph state
 */
const GraphContextWrapper: React.FC<GraphContextWrapperProps> = ({ 
  children, 
  initialDashboardId = 'default' 
}) => {
  const { theme } = useTheme();
  
  return (
    <GraphContextProvider 
      initialDashboardId={initialDashboardId} 
      initialOptions={{ theme: theme === 'dark' ? 'dark' : 'light' }}
    >
      <div className={`graph-container theme-${theme}`}>
        {children}
      </div>
    </GraphContextProvider>
  );
};

export default GraphContextWrapper; 