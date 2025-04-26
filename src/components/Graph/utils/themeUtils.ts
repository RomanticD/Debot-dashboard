import * as echarts from 'echarts';
import { ThemeMode } from '../context/ThemeContext';

export const registerEChartsThemes = (): void => {
  echarts.registerTheme('light', {
    // Light theme configuration
    backgroundColor: '#f4f4f4',
    textStyle: {
      color: '#05192b'
    }
    // Add other light theme properties
  });
  echarts.registerTheme('dark', {
    // Dark theme configuration  
    backgroundColor: 'rgba(0,0,0,0.36)',
    textStyle: {
      color: '#cccccc'
    }
    // Add other dark theme properties
  });
};

export const getEChartsTheme = (themeMode: ThemeMode): string => {
  return themeMode;
};
