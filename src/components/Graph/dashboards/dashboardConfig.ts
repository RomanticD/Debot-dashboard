import { ChartType } from '~/components/Graph/types/charts';
import {createDashboardRegistry, DashboardDefinition} from "~/components/Graph/dashboards/dashboardUtls";
import MockData from '../data/mockData';

/**
 * API endpoint mapping interface
 * Maps chart data URLs to their corresponding data sources in MockData
 */
export interface ApiEndpointMapping {
    path: string;
    dataGetter: () => any;
}

/**
 * API endpoint configuration grouped by dashboard
 * This will be used to generate all API routes dynamically
 */
export const dashboardApiConfig: Record<string, ApiEndpointMapping[]> = {
    default: [
        {
            path: '/api/charts/default/sales-comparison',
            dataGetter: () => MockData.bar.basic.salesComparison
        },
        {
            path: '/api/charts/default/traffic-sources',
            dataGetter: () => MockData.pie.basic.trafficSources
        },
        {
            path: '/api/charts/default/website-traffic',
            dataGetter: () => MockData.line.basic.websiteTraffic
        }
    ],
    dashboard1: [
        {
            path: '/api/charts/dashboard1/sales-comparison',
            dataGetter: () => MockData.bar.basic.salesComparison
        },
        {
            path: '/api/charts/dashboard1/annual-comparison',
            dataGetter: () => MockData.bar.multiSeries.annualComparison
        }
    ],
    dashboard2: [
        {
            path: '/api/charts/dashboard2/product-category',
            dataGetter: () => MockData.bar.multiSeries.productCategory
        },
        {
            path: '/api/charts/dashboard2/drink-preferences',
            dataGetter: () => MockData.pie.rose.drinkPreferences
        }
    ],
    dashboard3: [
        {
            path: '/api/charts/dashboard3/payment-methods',
            dataGetter: () => MockData.pie.doughnut.paymentMethods
        },
        {
            path: '/api/charts/dashboard3/weather-trend',
            dataGetter: () => MockData.line.multiSeries.weatherTrend
        }
    ],
    dashboard4: [
        {
            path: '/api/charts/dashboard4/drink-preferences',
            dataGetter: () => MockData.pie.rose.drinkPreferences
        },
        {
            path: '/api/charts/dashboard4/product-category',
            dataGetter: () => MockData.bar.multiSeries.productCategory
        }
    ]
};

/**
 * Centralized dashboard definitions
 * All dashboard configurations are defined in this single array
 * Each dashboard's charts reference APIs defined in dashboardApiConfig
 */
const dashboardDefinitions: DashboardDefinition[] = [
    // Default Dashboard
    {
        id: 'default',
        title: "通用数据仪表盘",
        description: "基础数据可视化",
        charts: [
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
        ]
    },

    // Chart Group 1
    {
        id: 1,
        title: "销售分析仪表盘",
        charts: [
            {
                chartType: ChartType.BAR_BASIC,
                dataUrl: '/api/charts/dashboard1/sales-comparison',
                title: "商品销量对比"
            },
            {
                chartType: ChartType.BAR_MULTI_SERIES,
                dataUrl: '/api/charts/dashboard1/annual-comparison',
                title: "年度销售趋势"
            }
        ]
    },

    // Chart Group 2
    {
        id: 2,
        title: "产品分析仪表盘",
        description: "各产品线性能和对比分析",
        charts: [
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
        ]
    },

    // Chart Group 3
    {
        id: 3,
        title: "组织绩效仪表盘",
        description: "团队结构和绩效分析",
        charts: [
            {
                chartType: ChartType.PIE_DOUGHNUT,
                dataUrl: '/api/charts/dashboard3/payment-methods',
                title: "人员分布"
            },
            {
                chartType: ChartType.LINE_MULTI_SERIES,
                dataUrl: '/api/charts/dashboard3/weather-trend',
                title: "绩效趋势"
            }
        ]
    },

    // Chart Group 4
    {
        id: 4,
        title: "消费分析仪表盘",
        charts: [
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
        ]
    }

    // Add more dashboard definitions here as needed
];

// Create the dashboard registry from our definitions
export const dashboardConfigs = createDashboardRegistry(dashboardDefinitions);

// Helper function to get all API endpoint mappings as a flattened array
export function getAllApiEndpoints(): ApiEndpointMapping[] {
    return Object.values(dashboardApiConfig).flat();
}

export default dashboardConfigs;