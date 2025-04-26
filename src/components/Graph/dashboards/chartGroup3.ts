import { ChartType } from '~/components/Graph/types/charts';
import { createDashboard } from '../utils/dashboardFactory';
import { BaseDashboardCreator } from '../utils/baseDashboard';

/**
 * 组织绩效仪表盘创建者实现
 */
class ChartGroup3Creator extends BaseDashboardCreator {
  getId(): number {
    return 3;
  }
  
  getTitle(): string {
    return "组织绩效仪表盘";
  }
  
  getDescription(): string {
    return "团队结构和绩效分析";
  }
  
  getCharts() {
    return [
      {
        chartType: ChartType.PIE_DOUGHNUT,
        dataUrl: '/api/charts/dashboard3/payment-methods',
        title: "人员分布"
      },
      {
        chartType: ChartType.LINE_MULTI_SERIES,
        dataUrl: '/api/charts/dashboard3/weather-trend',
        title: "绩效趋势"
      }
    ];
  }
}

export default createDashboard(new ChartGroup3Creator());