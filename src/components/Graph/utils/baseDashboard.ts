import { ChartConfig } from '~/components/Graph/types/charts';
import { DashboardCreator } from './dashboardFactory';

/**
 * 仪表盘创建者基类
 * 提供常用方法的默认实现，减少重复代码
 */
export abstract class BaseDashboardCreator implements DashboardCreator {
  /**
   * 仪表盘ID - 由子类实现
   */
  abstract getId(): string | number;
  
  /**
   * 仪表盘标题 - 由子类实现
   */
  abstract getTitle(): string;
  
  /**
   * 仪表盘图表配置 - 由子类实现
   */
  abstract getCharts(): ChartConfig[];
  
  /**
   * 仪表盘描述 - 可选覆盖
   */
  getDescription?(): string | undefined {
    return undefined;
  }
  
  /**
   * 其他扩展属性 - 可选覆盖
   */
  getExtensions?(): Record<string, any> {
    return {};
  }
} 