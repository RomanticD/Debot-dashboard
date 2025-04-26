import { ChartType } from '~/components/Graph/types/charts';
import { createDashboard } from '../utils/dashboardFactory';
import { BaseDashboardCreator } from '../utils/baseDashboard';

/**
 * 产品分析仪表盘创建者实现
 */
class ChartGroup2Creator extends BaseDashboardCreator {
  getId(): number {
    return 2;
  }
  
  getTitle(): string {
    return "产品分析仪表盘";
  }

  getDescription(): string {
    return "各产品线性能和对比分析";
  }
  
  getCharts() {
    return [
      {
        chartType: ChartType.BAR_MULTI_SERIES,
        dataUrl: '/api/charts/dashboard2/product-category',
        title: "产品线销量"
      },
      {
        chartType: ChartType.PIE_ROSE,
        dataUrl: '/api/charts/dashboard2/drink-preferences',
        title: "产品品类分布"
      }
    ];
  }
}

export default createDashboard(new ChartGroup2Creator());