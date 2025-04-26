import * as echarts from 'echarts';
import { ChartType, ChartData } from '~/components/Graph/types/charts';

const chartOptionGenerators: Record<ChartType, (data: ChartData) => echarts.EChartsOption> = {
    [ChartType.BAR_BASIC]: (data) => ({
        xAxis: { type: 'category', data: data.xAxisData },
        yAxis: { type: 'value' },
        series: data.series.map((item: any) => ({ name: item.name, type: 'bar', data: item.data }))
    }),
    [ChartType.BAR_MULTI_SERIES]: (data) => ({
        xAxis: { type: 'category', data: data.xAxisData },
        yAxis: { type: 'value' },
        series: data.series.map((item: any) => ({ name: item.name, type: 'bar', data: item.data }))
    }),
    [ChartType.BAR_HORIZONTAL]: (data) => ({
        yAxis: { type: 'category', data: data.yAxisData },
        xAxis: { type: 'value' },
        series: data.series.map((item: any) => ({ name: item.name, type: 'bar', data: item.data }))
    }),
    [ChartType.LINE_BASIC]: (data) => ({
        xAxis: { type: 'category', data: data.xAxisData },
        yAxis: { type: 'value' },
        series: data.series.map((item: any) => ({ name: item.name, type: 'line', data: item.data, smooth: item.smooth }))
    }),
    [ChartType.LINE_MULTI_SERIES]: (data) => ({
        xAxis: { type: 'category', data: data.xAxisData },
        yAxis: { type: 'value' },
        series: data.series.map((item: any) => ({ name: item.name, type: 'line', data: item.data, smooth: item.smooth }))
    }),
    [ChartType.PIE_BASIC]: (data) => ({
        series: data.series.map((item: any) => ({
            name: item.name,
            type: 'pie',
            radius: item.radius || '50%',
            roseType: item.roseType,
            data: item.data
        }))
    }),
    [ChartType.PIE_ROSE]: (data) => ({
        series: data.series.map((item: any) => ({
            name: item.name,
            type: 'pie',
            radius: item.radius || '50%',
            roseType: 'area',
            data: item.data
        }))
    }),
    [ChartType.PIE_DOUGHNUT]: (data) => ({
        series: data.series.map((item: any) => ({
            name: item.name,
            type: 'pie',
            radius: item.radius || ['40%', '70%'],
            data: item.data
        }))
    }),
    [ChartType.SCATTER]: (data) => ({
        xAxis: { type: 'value' },
        yAxis: { type: 'value' },
        series: data.series.map((item: any) => ({
            name: item.name,
            type: 'scatter',
            symbolSize: item.symbolSize,
            data: item.data
        }))
    }),
    [ChartType.RADAR]: (data) => ({
        radar: { indicator: data.indicators },
        series: data.series.map((item: any) => ({ name: item.name, type: 'radar', data: item.data }))
    }),
    [ChartType.GAUGE]: (data) => ({
        series: data.series.map((item: any) => ({
            name: item.name,
            type: 'gauge',
            detail: { formatter: '{value}%' },
            data: item.data,
            axisLine: item.axisLine
        }))
    }),
    [ChartType.FUNNEL]: (data) => ({
        series: data.series.map((item: any) => ({
            name: item.name,
            type: 'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '80%',
            gap: item.gap || 2,
            label: item.label || { show: true, position: 'inside' },
            data: item.data
        }))
    }),
    [ChartType.HEATMAP]: (data) => {
        if (data.calendarDays) {
            return {
                visualMap: { min: 0, max: data.visualMaxValue, calculable: true, orient: 'horizontal', left: 'center', bottom: '15%' },
                calendar: { range: data.calendarDays },
                series: data.series.map((item: any) => ({ name: item.name, type: 'heatmap', coordinateSystem: 'calendar', data: item.data }))
            };
        }
        return {
            xAxis: { type: 'category', data: data.xAxisData, splitArea: { show: true } },
            yAxis: { type: 'category', data: data.yAxisData, splitArea: { show: true } },
            visualMap: { min: 0, max: data.visualMaxValue, calculable: true, orient: 'horizontal', left: 'center', bottom: '15%' },
            series: data.series.map((item: any) => ({ name: item.name, type: 'heatmap', data: item.data, label: { show: true } }))
        };
    },
    [ChartType.TREE]: (data) => ({
        series: data.series.map((item: any) => ({
            name: item.name,
            type: 'tree',
            data: item.data,
            top: '1%',
            left: '7%',
            bottom: '1%',
            right: '20%',
            symbolSize: 7,
            label: { position: 'left', verticalAlign: 'middle', align: 'right' },
            leaves: { label: { position: 'right', verticalAlign: 'middle', align: 'left' } },
            expandAndCollapse: true
        }))
    }),
    [ChartType.BOXPLOT]: (data) => ({
        xAxis: { type: 'category', data: data.xAxisData },
        yAxis: { type: 'value' },
    })
};

export default chartOptionGenerators;