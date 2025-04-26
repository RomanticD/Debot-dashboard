import React, { ReactNode, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';

import importThemeStyles from './utils/importThemeStyles';
import {registerEChartsThemes} from "~/components/Graph/utils/themeUtils";

interface ThemeRootProps {
  children: ReactNode;
}

/**
 * Root theme provider for the entire application
 * Provides theme context and registers ECharts themes globally
 */
const ThemeRoot: React.FC<ThemeRootProps> = ({ children }) => {
  useEffect(() => {
    registerEChartsThemes();
    importThemeStyles();
  }, []);

  return <ThemeProvider>{children}</ThemeProvider>;
};

export default ThemeRoot; 