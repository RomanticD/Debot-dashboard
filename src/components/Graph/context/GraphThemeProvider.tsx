import React, { ReactNode, useEffect } from 'react';
import { ThemeProvider } from '~/components/Graph/context/ThemeContext';
import { registerEChartsThemes } from '~/components/Graph/utils/themeUtils';
import importThemeStyles from '~/components/Graph/utils/importThemeStyles';

interface GraphThemeProviderProps {
  children: ReactNode;
}

/**
 * Wrapper component for the Graph module that registers ECharts themes
 * and provides theme context to all children
 */
export const GraphThemeProvider: React.FC<GraphThemeProviderProps> = ({ children }) => {
  // Register ECharts themes and import styles on mount
  useEffect(() => {
    registerEChartsThemes();
    importThemeStyles();
  }, []);

  return <ThemeProvider>{children}</ThemeProvider>;
};

export default GraphThemeProvider; 