import { ChartType } from '~/components/Graph/types/charts';
import { createDashboard } from '../utils/dashboardFactory';
import { BaseDashboardCreator } from '../utils/baseDashboard';

/**
 * 销售分析仪表盘创建者实现
 */
class ChartGroup1Creator extends BaseDashboardCreator {
  getId(): number {
    return 1;
  }
  
  getTitle(): string {
    return "销售分析仪表盘";
  }
  
  getCharts() {
    return [
      {
        chartType: ChartType.BAR_BASIC,
        dataUrl: '/api/charts/dashboard1/sales-comparison',
        title: "商品销量对比"
      },
      {
        chartType: ChartType.BAR_MULTI_SERIES,
        dataUrl: '/api/charts/dashboard1/annual-comparison',
        title: "年度销售趋势"
      }
    ];
  }
}

export default createDashboard(new ChartGroup1Creator());