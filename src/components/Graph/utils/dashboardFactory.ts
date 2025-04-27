import { DashboardConfig, ChartConfig } from '~/components/Graph/types/charts';

/**
 * 仪表盘创建者接口
 * 所有仪表盘实现此接口以确保统一性
 */
export interface DashboardCreator {
  /**
   * 获取仪表盘ID
   */
  getId(): string | number;
  
  /**
   * 获取仪表盘标题
   */
  getTitle(): string;
  
  /**
   * 获取仪表盘描述（可选）
   */
  getDescription?(): string | undefined;
  
  /**
   * 获取仪表盘图表配置
   */
  getCharts(): ChartConfig[];
  
  /**
   * 其他扩展属性（可选）
   */
  getExtensions?(): Record<string, any>;
}

/**
 * 创建仪表盘配置的工厂函数
 * @param creator 仪表盘创建者实现
 * @returns 标准格式的仪表盘配置
 */
export function createDashboard(creator: DashboardCreator): DashboardConfig {
  const config: DashboardConfig = {
    id: creator.getId(),
    title: creator.getTitle(),
    charts: creator.getCharts(),
  };
  
  // 添加可选的描述
  if (creator.getDescription) {
    const description = creator.getDescription();
    if (description !== undefined) {
      config.description = description;
    }
  }
  
  // 添加任何扩展属性
  if (creator.getExtensions) {
    const extensions = creator.getExtensions();
    Object.assign(config, extensions);
  }
  
  return config;
} 