import * as echarts from 'echarts';
import { ChartType, ChartData } from '~/components/Graph/types/charts';

// Theme-based color palettes
export const CHART_PALETTES = {
    light: [
        '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
        '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'
    ],
    dark: [
        '#4992ff', '#7cffb2', '#fddd60', '#ff6e76', '#58d9f9',
        '#05c091', '#ff9a45', '#bc67da', '#ff8dd5'
    ]
};

// Base configuration factory with common settings
const createBaseChartConfig = (theme: 'light' | 'dark', title?: string, subtext?: string): Partial<echarts.EChartsOption> => {
    return {
        color: CHART_PALETTES[theme],
        title: title || subtext ? {
            text: title,
            subtext: subtext,
            left: 'center',
            top: 0,
            ...(theme === 'dark' ? { textStyle: { color: '#e5e7eb' } } : {})
        } : undefined,
        tooltip: {
            trigger: 'item' as const
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
        },
        legend: {
            ...(theme === 'dark'
                ? { textStyle: { color: '#e5e7eb' } }
                : { textStyle: { color: '#1f2937' } }),
            bottom: 0,
            left: 'center'
        }
    };
};

// Type definitions for chart data structures
interface BarChartData extends ChartData {
    xAxisData?: string[];
    yAxisData?: string[];
    series: Array<{
        name: string;
        data: number[];
        [key: string]: any;
    }>;
}

interface LineChartData extends ChartData {
    xAxisData: string[];
    series: Array<{
        name: string;
        data: number[];
        smooth?: boolean;
        [key: string]: any;
    }>;
}

interface PieChartData extends ChartData {
    series: Array<{
        name: string;
        data: Array<{
            name: string;
            value: number;
            [key: string]: any;
        }>;
        radius?: string | string[];
        roseType?: 'radius' | 'area';
        label?: {
            formatter?: string;
            [key: string]: any;
        };
        [key: string]: any;
    }>;
}

interface ScatterChartData extends ChartData {
    series: Array<{
        name: string;
        data: Array<number[]>;
        symbolSize?: number | number[] | ((value: any, params: any) => number);
        [key: string]: any;
    }>;
}

interface RadarChartData extends ChartData {
    indicators: Array<{
        name: string;
        max: number;
        [key: string]: any;
    }>;
    series: Array<{
        name: string;
        data: Array<{
            value: number[];
            name: string;
            [key: string]: any;
        }>;
        [key: string]: any;
    }>;
}

interface GaugeChartData extends ChartData {
    series: Array<{
        name: string;
        data: Array<{
            value: number;
            name: string;
            [key: string]: any;
        }>;
        axisLine?: {
            lineStyle: {
                color: Array<[number, string]>;
            };
        };
        [key: string]: any;
    }>;
}

interface FunnelChartData extends ChartData {
    series: Array<{
        name: string;
        data: Array<{
            value: number;
            name: string;
            [key: string]: any;
        }>;
        gap?: number;
        label?: {
            [key: string]: any;
        };
        [key: string]: any;
    }>;
}

interface HeatmapChartData extends ChartData {
    xAxisData?: string[];
    yAxisData?: string[];
    calendarDays?: string[];
    visualMaxValue: number;
    series: Array<{
        name: string;
        data: Array<any[]>;
        [key: string]: any;
    }>;
}

interface TreeChartData extends ChartData {
    series: Array<{
        name: string;
        data: Array<{
            name: string;
            children?: any[];
            [key: string]: any;
        }>;
        [key: string]: any;
    }>;
}

interface BoxplotChartData extends ChartData {
    xAxisData: string[];
    series: Array<{
        name: string;
        data: Array<number[]>;
        [key: string]: any;
    }>;
}

// Bar chart generators
const createBasicBarChartOption = (data: BarChartData): Partial<echarts.EChartsOption> => ({
    xAxis: { type: 'category', data: data.xAxisData },
    yAxis: { type: 'value' },
    series: data.series.map(item => ({ 
        name: item.name, 
        type: 'bar', 
        data: item.data 
    }))
});

const createMultiSeriesBarChartOption = (data: BarChartData): Partial<echarts.EChartsOption> => ({
    xAxis: { type: 'category', data: data.xAxisData },
    yAxis: { type: 'value' },
    series: data.series.map(item => ({ 
        name: item.name, 
        type: 'bar', 
        data: item.data 
    }))
});

const createHorizontalBarChartOption = (data: BarChartData): Partial<echarts.EChartsOption> => ({
    yAxis: { type: 'category', data: data.yAxisData },
    xAxis: { type: 'value' },
    series: data.series.map(item => ({ 
        name: item.name, 
        type: 'bar', 
        data: item.data 
    }))
});

// Line chart generators
const createBasicLineChartOption = (data: LineChartData): Partial<echarts.EChartsOption> => ({
    xAxis: { type: 'category', data: data.xAxisData },
    yAxis: { type: 'value' },
    series: data.series.map(item => ({ 
        name: item.name, 
        type: 'line', 
        data: item.data, 
        smooth: item.smooth 
    }))
});

const createMultiSeriesLineChartOption = (data: LineChartData): Partial<echarts.EChartsOption> => ({
    xAxis: { type: 'category', data: data.xAxisData },
    yAxis: { type: 'value' },
    series: data.series.map(item => ({ 
        name: item.name, 
        type: 'line', 
        data: item.data, 
        smooth: item.smooth 
    }))
});

// Pie chart generators
const createBasicPieChartOption = (data: PieChartData, theme: 'light' | 'dark' = 'light'): Partial<echarts.EChartsOption> => ({
    series: data.series.map(item => ({
        name: item.name,
        type: 'pie',
        radius: item.radius || '50%',
        roseType: item.roseType,
        data: item.data,
        label: {
            ...item.label,
            color: theme === 'dark' ? '#e5e7eb' : '#1f2937',
            formatter: item.label?.formatter || '{b}: {d}%'
        },
        emphasis: {
            label: {
                color: theme === 'dark' ? '#ffffff' : '#000000',
                fontWeight: 'bold'
            }
        }
    }))
});

const createRosePieChartOption = (data: PieChartData, theme: 'light' | 'dark' = 'light'): Partial<echarts.EChartsOption> => ({
    series: data.series.map(item => ({
        name: item.name,
        type: 'pie',
        radius: item.radius || '50%',
        roseType: 'area',
        data: item.data,
        label: {
            ...item.label,
            color: theme === 'dark' ? '#e5e7eb' : '#1f2937',
            formatter: item.label?.formatter || '{b}: {d}%'
        },
        emphasis: {
            label: {
                color: theme === 'dark' ? '#ffffff' : '#000000',
                fontWeight: 'bold'
            }
        }
    }))
});

const createDoughnutPieChartOption = (data: PieChartData, theme: 'light' | 'dark' = 'light'): Partial<echarts.EChartsOption> => ({
    series: data.series.map(item => ({
        name: item.name,
        type: 'pie',
        radius: item.radius || ['40%', '70%'],
        data: item.data,
        label: {
            ...item.label,
            color: theme === 'dark' ? '#e5e7eb' : '#1f2937',
            formatter: item.label?.formatter || '{b}: {d}%'
        },
        emphasis: {
            label: {
                color: theme === 'dark' ? '#ffffff' : '#000000',
                fontWeight: 'bold'
            }
        }
    }))
});

// Scatter chart generator
const createScatterChartOption = (data: ScatterChartData): Partial<echarts.EChartsOption> => ({
    xAxis: { type: 'value' },
    yAxis: { type: 'value' },
    series: data.series.map(item => ({
        name: item.name,
        type: 'scatter',
        symbolSize: item.symbolSize,
        data: item.data
    }))
});

// Radar chart generator
const createRadarChartOption = (data: RadarChartData): Partial<echarts.EChartsOption> => ({
    radar: { indicator: data.indicators },
    series: data.series.map(item => ({ 
        name: item.name, 
        type: 'radar', 
        data: item.data 
    }))
});

// Gauge chart generator
const createGaugeChartOption = (data: GaugeChartData): Partial<echarts.EChartsOption> => ({
    series: data.series.map(item => ({
        name: item.name,
        type: 'gauge',
        detail: { formatter: '{value}%' },
        data: item.data,
        axisLine: item.axisLine
    }))
});

// Funnel chart generator
const createFunnelChartOption = (data: FunnelChartData, theme: 'light' | 'dark' = 'light'): Partial<echarts.EChartsOption> => ({
    series: data.series.map(item => ({
        name: item.name,
        type: 'funnel',
        left: '10%',
        top: 60,
        bottom: 60,
        width: '80%',
        gap: item.gap || 2,
        label: {
            show: true,
            position: 'inside',
            ...item.label,
            color: theme === 'dark' ? '#e5e7eb' : '#1f2937'
        },
        data: item.data
    }))
});

// Heatmap chart generator
const createHeatmapChartOption = (data: HeatmapChartData): Partial<echarts.EChartsOption> => {
    if (data.calendarDays) {
        return {
            visualMap: { 
                min: 0, 
                max: data.visualMaxValue, 
                calculable: true, 
                orient: 'horizontal', 
                left: 'center', 
                bottom: '15%' 
            },
            calendar: { range: data.calendarDays },
            series: data.series.map(item => ({ 
                name: item.name, 
                type: 'heatmap', 
                coordinateSystem: 'calendar', 
                data: item.data 
            }))
        };
    }
    
    return {
        xAxis: { 
            type: 'category', 
            data: data.xAxisData, 
            splitArea: { show: true } 
        },
        yAxis: { 
            type: 'category', 
            data: data.yAxisData, 
            splitArea: { show: true } 
        },
        visualMap: { 
            min: 0, 
            max: data.visualMaxValue, 
            calculable: true, 
            orient: 'horizontal', 
            left: 'center', 
            bottom: '15%' 
        },
        series: data.series.map(item => ({ 
            name: item.name, 
            type: 'heatmap', 
            data: item.data, 
            label: { show: true } 
        }))
    };
};

// Tree chart generator
const createTreeChartOption = (data: TreeChartData, theme: 'light' | 'dark' = 'light'): Partial<echarts.EChartsOption> => ({
    series: data.series.map(item => ({
        name: item.name,
        type: 'tree',
        data: item.data,
        top: '1%',
        left: '7%',
        bottom: '1%',
        right: '20%',
        symbolSize: 7,
        label: { 
            position: 'left', 
            verticalAlign: 'middle', 
            align: 'right',
            color: theme === 'dark' ? '#e5e7eb' : '#1f2937'
        },
        leaves: { 
            label: { 
                position: 'right', 
                verticalAlign: 'middle', 
                align: 'left',
                color: theme === 'dark' ? '#e5e7eb' : '#1f2937'
            } 
        },
        expandAndCollapse: true
    }))
});

// Boxplot chart generator
const createBoxplotChartOption = (data: BoxplotChartData): Partial<echarts.EChartsOption> => ({
    xAxis: { type: 'category', data: data.xAxisData },
    yAxis: { type: 'value' },
    series: data.series.map(item => ({
        name: item.name,
        type: 'boxplot',
        data: item.data
    }))
});

// Main chart option generator map
const chartOptionGenerators = {
    // Bar chart generators
    [ChartType.BAR_BASIC]: createBasicBarChartOption,
    [ChartType.BAR_MULTI_SERIES]: createMultiSeriesBarChartOption,
    [ChartType.BAR_HORIZONTAL]: createHorizontalBarChartOption,
    
    // Line chart generators
    [ChartType.LINE_BASIC]: createBasicLineChartOption,
    [ChartType.LINE_MULTI_SERIES]: createMultiSeriesLineChartOption,
    
    // Pie chart generators
    [ChartType.PIE_BASIC]: createBasicPieChartOption,
    [ChartType.PIE_ROSE]: createRosePieChartOption,
    [ChartType.PIE_DOUGHNUT]: createDoughnutPieChartOption,
    
    // Other chart generators
    [ChartType.SCATTER]: createScatterChartOption,
    [ChartType.RADAR]: createRadarChartOption,
    [ChartType.GAUGE]: createGaugeChartOption,
    [ChartType.FUNNEL]: createFunnelChartOption,
    [ChartType.HEATMAP]: createHeatmapChartOption,
    [ChartType.TREE]: createTreeChartOption,
    [ChartType.BOXPLOT]: createBoxplotChartOption
};

// Type for chart generator function
type ChartOptionGenerator<T extends ChartData = ChartData> = (data: T, theme?: 'light' | 'dark') => Partial<echarts.EChartsOption>;

// Function to get generator for specific chart type
export const getChartOptionGenerator = <T extends ChartData>(chartType: ChartType): ChartOptionGenerator<T> => {
    // First cast to unknown, then to the correct type to avoid TypeScript errors
    return (chartOptionGenerators[chartType] as unknown) as ChartOptionGenerator<T>;
};

// Function to create chart options with theme and config applied
export const createChartOptions = (
    chartType: ChartType, 
    data: ChartData, 
    theme: 'light' | 'dark', 
    title?: string, 
    subtext?: string, 
    customOptions?: Partial<echarts.EChartsOption>
): echarts.EChartsOption => {
    const baseConfig = createBaseChartConfig(theme, title, subtext);
    const generator = getChartOptionGenerator(chartType);
    const specificConfig = generator(data, theme);
    
    return {
        ...baseConfig,
        ...specificConfig,
        ...customOptions
    } as echarts.EChartsOption;
};


