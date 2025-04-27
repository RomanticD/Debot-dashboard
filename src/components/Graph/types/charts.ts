// 图表类型枚举
export enum ChartType {
    BAR_BASIC = 'bar.basic',
    BAR_MULTI_SERIES = 'bar.multiSeries',
    BAR_HORIZONTAL = 'bar.horizontal',
    PIE_BASIC = 'pie.basic',
    PIE_ROSE = 'pie.rose',
    PIE_DOUGHNUT = 'pie.doughnut',
    LINE_BASIC = 'line.basic',
    LINE_MULTI_SERIES = 'line.multiSeries',
    SCATTER = 'scatter',
    RADAR = 'radar',
    GAUGE = 'gauge',
    FUNNEL = 'funnel',
    HEATMAP = 'heatmap',
    TREE = 'tree',
    BOXPLOT = 'boxplot'
}

// 图表数据接口
export interface ChartData {
    [key: string]: any;
}

// 图表配置接口
export interface ChartConfig {
    chartType: ChartType;
    chartData?: ChartData;
    dataUrl?: string;
    title: string;
    subtext?: string;
    customOptions?: Record<string, any>;
    aspectRatio?: string;
}

// 仪表盘配置接口
export interface DashboardConfig {
    id?: string | number;
    title: string;
    description?: string;
    charts: ChartConfig[];
    layout?: {
        columns?: number;
        rows?: number;
        gap?: string;
    };
}

export interface Graph {
    id: number;
    name: string;
} 