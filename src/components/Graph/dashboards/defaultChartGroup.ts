import { ChartType } from '~/components/Graph/types/charts';
import { createDashboard } from '../utils/dashboardFactory';
import { BaseDashboardCreator } from '../utils/baseDashboard';

/**
 * 通用数据仪表盘创建者实现
 */
class DefaultChartGroupCreator extends BaseDashboardCreator {
  getId(): string {
    return 'default';
  }
  
  getTitle(): string {
    return "通用数据仪表盘";
  }
  
  getDescription(): string {
    return "基础数据可视化";
  }
  
  getCharts() {
    return [
      { 
        chartType: ChartType.BAR_BASIC, 
        dataUrl: '/api/charts/default/sales-comparison', 
        title: "基础柱状图" 
      },
      {
        chartType: ChartType.PIE_BASIC,
        dataUrl: '/api/charts/default/traffic-sources',
        title: "流量来源分布"
      },
      { 
        chartType: ChartType.LINE_BASIC, 
        dataUrl: '/api/charts/default/website-traffic', 
        title: "基础折线图" 
      }
    ];
  }
}

export default createDashboard(new DefaultChartGroupCreator());