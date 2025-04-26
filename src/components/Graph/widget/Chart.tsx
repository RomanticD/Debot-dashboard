import * as echarts from 'echarts';
import { useEffect, useRef, useState } from "react";
import { ChartConfig, ChartData } from '~/components/Graph/types/charts';
import chartOptionGenerators from '~/components/Graph/utils/chartOptionGenerators';
import { useQuery } from '@tanstack/react-query';
import ChartSkeleton from './Skeleton';
import { useTheme } from '~/components/Graph/context/ThemeContext';


function Chart({ config }: { config: ChartConfig }) {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstanceRef = useRef<echarts.ECharts | null>(null);
    const [fetchedData, setFetchedData] = useState<ChartData | undefined>(undefined);
    const chartData = config.dataUrl ? fetchedData : config.chartData;
    const { theme } = useTheme(); // Get current theme from context

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

    // Effect to handle theme changes
    useEffect(() => {
        if (!chartRef.current) return;

        // Dispose old instance when theme changes
        if (chartInstanceRef.current) {
            try {
                chartInstanceRef.current.dispose();
                chartInstanceRef.current = null;
            } catch (e) {
                console.warn("Error disposing chart on theme change:", e);
            }
        }

        // Re-initialize with the new theme
        try {
            chartInstanceRef.current = echarts.init(chartRef.current, theme);

            // Re-render with the new theme if data is available
            if (chartData && !isLoading) {
                const generator = chartOptionGenerators[config.chartType];
                if (generator) {
                    const option = {
                        title: {
                            text: config.title,
                            subtext: config.subtext,
                            textStyle: {
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: theme === 'dark' ? '#ffffff' : '#666666',
                            },
                            left: 'center'
                        },
                        tooltip: {},
                        grid: { containLabel: true },
                        ...generator(chartData),
                        ...config.customOptions
                    };
                    chartInstanceRef.current.setOption(option, false);}
            }
        } catch (e) {
            console.error("Error initializing chart with theme:", e);
        }
    }, [theme]);

    useEffect(() => {
        if (!chartRef.current) return;

        const generator = chartOptionGenerators[config.chartType];
        if (!generator) {
            console.error(`Chart generator for type '${config.chartType}' not found.`);
            return;
        }

        if (!chartInstanceRef.current) {
             try {
                // Initialize with current theme
                chartInstanceRef.current = echarts.init(chartRef.current, theme);
             } catch (e) {
                 console.error("Error initializing chart:", e);
                 return;
             }
        }

        if (chartData && !isLoading) {
            try {
                const option = {
                    title: { 
                        text: config.title, 
                        subtext: config.subtext,
                        textStyle: {
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: theme === 'dark' ? '#ffffff' : '#666666',
                        },
                        left: 'center'
                    },
                    tooltip: {},
                    grid: { containLabel: true },
                    ...generator(chartData),
                    ...config.customOptions
                };
                chartInstanceRef.current.setOption(option, false); 
             } catch (e) {
                 console.error("Error setting chart option:", e);
             }
        } else if (!isLoading && !chartData && chartInstanceRef.current) {
             try {
                chartInstanceRef.current.clear();
             } catch (e) {
                 console.warn("Error clearing chart:", e);
             }
        }

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
        };
    }, [config.chartType, config.title, config.subtext, config.customOptions, chartData, isLoading, chartRef]);

    useEffect(() => {
        const handleResize = () => {
            if (chartInstanceRef.current) {
                 try {
                    chartInstanceRef.current.resize();
                 } catch (e) {
                     console.warn("Error resizing chart:", e);
                 }
            }
        };

        if(chartInstanceRef.current) {
            window.addEventListener('resize', handleResize);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [chartInstanceRef.current]);


    if (isLoading && config.dataUrl) {
        return <ChartSkeleton />;
    }

    if (queryError) {
        return <div className={`flex items-center justify-center h-[300px] w-full rounded-md ${theme === 'dark' ? 'bg-red-900' : 'bg-red-50'}`}>
            <span className={theme === 'dark' ? 'text-red-300' : 'text-red-500'}>{queryError.message}</span>
        </div>;
    }

    return <div ref={chartRef} style={{ height: '800px', width: '100%' }} className={`chart-container theme-${theme}`} />;
}

export default Chart; 