import { ChartType } from '~/components/Graph/types/charts';
import { createDashboard } from '../utils/dashboardFactory';
import { BaseDashboardCreator } from '../utils/baseDashboard';

/**
 * 消费分析仪表盘创建者实现
 */
class ChartGroup4Creator extends BaseDashboardCreator {
  getId(): number {
    return 4;
  }
  
  getTitle(): string {
    return "消费分析仪表盘";
  }
  
  getCharts() {
    return [
      {
        chartType: ChartType.PIE_ROSE,
        dataUrl: '/api/charts/dashboard4/drink-preferences',
        title: "饮料偏好分布"
      },
      {
        chartType: ChartType.BAR_MULTI_SERIES,
        dataUrl: '/api/charts/dashboard4/product-category',
        title: "商品品类销售渠道分布"
      }
    ];
  }
}

export default createDashboard(new ChartGroup4Creator());