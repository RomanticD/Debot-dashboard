import * as echarts from 'echarts';
import { useEffect, useRef, useState, useCallback } from "react";
import { ChartConfig, ChartData } from '~/components/Graph/types/charts';
import chartOptionGenerators from '~/components/Graph/utils/chartOptionGenerators';
import { useQuery } from '@tanstack/react-query';
import ChartSkeleton from './Skeleton';
import { useTheme } from '~/components/Graph/context/ThemeContext';


function Chart({ config }: { config: ChartConfig }) {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstanceRef = useRef<echarts.ECharts | null>(null);
    const resizeObserverRef = useRef<ResizeObserver | null>(null);
    const isInitialMount = useRef(true);
    const [fetchedData, setFetchedData] = useState<ChartData | undefined>(undefined);
    const chartData = config.dataUrl ? fetchedData : config.chartData;
    const { theme } = useTheme();

    const { isLoading, error: queryError, data: queryData } = useQuery({
        queryKey: ['chartData', config.dataUrl],
        queryFn: async () => {
            if (!config.dataUrl) return null;
            const response = await fetch(config.dataUrl);
            if (!response.ok) {
                throw new Error(`API response error: ${response.status}`);
            }
            const data: ChartData = await response.json();
            return data;
        },
        enabled: !!config.dataUrl,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (queryData) {
            setFetchedData(queryData);
        }
    }, [queryData]);

    const updateChart = useCallback(() => {
        if (!chartInstanceRef.current || !chartData) return;

        try {
            const chartType = config.chartType;
            const option = chartOptionGenerators[chartType](chartData);
            chartInstanceRef.current.setOption({
                ...option,
                title: {
                    text: config.title,
                    subtext: config.subtext,
                    left: 'center',
                    top: 0,
                    ...(theme === 'dark' ? { textStyle: { color: '#e5e7eb' } } : {})
                },
                tooltip: {
                    trigger: 'item'
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
                },
                ...config.customOptions
            });
        } catch (e) {
            console.error("Error updating chart with data:", e);
        }
    }, [chartData, config, theme]);

    useEffect(() => {
        if (!chartRef.current) return;

        if (!chartInstanceRef.current) {
            try {
                console.log('Initializing chart instance');
                chartInstanceRef.current = echarts.init(chartRef.current, theme);
            } catch (e) {
                console.error("Error initializing chart:", e);
                return;
            }
        }
        updateChart();
        return () => {
            if (chartInstanceRef.current) {
                try {
                    if (chartRef.current && document.body.contains(chartRef.current)) {
                        console.log("Disposing chart instance on unmount");
                        chartInstanceRef.current.dispose();
                    }
                    chartInstanceRef.current = null;
                } catch (e) {
                    console.warn("Error disposing chart on unmount:", e);
                }
            }
            isInitialMount.current = true;
        };
    }, [theme, updateChart, chartRef]);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        if (chartInstanceRef.current && chartRef.current) {
            console.log('Theme changed, re-initializing chart');
            try {
                chartInstanceRef.current.dispose();
                chartInstanceRef.current = echarts.init(chartRef.current, theme);
                updateChart();
            } catch (e) {
                console.error("Error re-initializing chart on theme change:", e);
                chartInstanceRef.current = null;
            }
        }
    }, [theme, updateChart]);

    useEffect(() => {
        if (!chartRef.current || !chartInstanceRef.current) return;
        if (resizeObserverRef.current) {
            resizeObserverRef.current.disconnect();
        }
        resizeObserverRef.current = new ResizeObserver(() => {
            if (chartInstanceRef.current) {
                try {
                    chartInstanceRef.current.resize();
                 } catch (e) {
                     console.warn("Error resizing chart on observer:", e);
                 }
            }
        });
        resizeObserverRef.current.observe(chartRef.current);

        const handleResize = () => {
            if (chartInstanceRef.current) {
                try {
                    chartInstanceRef.current.resize();
                } catch (e) {
                    console.warn("Error resizing chart on window resize:", e);
                }
            }
        };
        window.addEventListener('resize', handleResize);
        const triggerResize = () => {
            if (chartInstanceRef.current) {
                try {
                    requestAnimationFrame(() => {
                        chartInstanceRef.current?.resize();
                    });
                } catch (e) {
                    console.warn("Error on forced chart resize:", e);
                }
            }
        };
        requestAnimationFrame(triggerResize);
        const resizeTimerId = setTimeout(triggerResize, 200);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
            }
            clearTimeout(resizeTimerId);
        };
    }, [chartInstanceRef, chartRef]);

    if (isLoading && config.dataUrl) {
        return <ChartSkeleton />;
    }
    if (queryError) {
        return <div className={`flex items-center justify-center h-[300px] w-full rounded-md ${theme === 'dark' ? 'bg-red-900' : 'bg-red-50'}`}>
            <span className={theme === 'dark' ? 'text-red-300' : 'text-red-500'}>{queryError.message}</span>
        </div>;
    }

    return <div ref={chartRef} style={{ height: '800px', width: '100%' }} className="chart-container" />;
}

export default Chart; 