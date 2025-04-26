import { DashboardConfig, ChartConfig, ChartType } from '~/components/Graph/types/charts';

/**
 * 图表组件选项接口
 */
export interface GraphComponentOptions {
  theme?: 'light' | 'dark' | 'auto';
  responsive?: boolean;
  refreshInterval?: number;
  showControls?: boolean;
}

export type { DashboardConfig, ChartConfig };
export { ChartType }; 