import * as echarts from 'echarts';

export const registerEChartsThemes = (): void => {
  echarts.registerTheme('light', {
    backgroundColor: '#f4f4f4',
    textStyle: {
      color: '#05192b'
    }
  });
  echarts.registerTheme('dark', {
    backgroundColor: 'rgba(0,0,0,0.36)',
    textStyle: {
      color: '#cccccc'
    }
  });
};
