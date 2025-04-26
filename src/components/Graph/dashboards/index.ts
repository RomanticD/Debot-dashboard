import { DashboardConfig } from '~/components/Graph/types/charts';
import chartGroup1 from './chartGroup1';
import chartGroup2 from './chartGroup2';
import chartGroup3 from './chartGroup3';
import chartGroup4 from './chartGroup4';
import defaultDashboard from './defaultChartGroup';

// 仪表盘配置集合
const dashboardConfigs: Record<string | number, DashboardConfig> = {
    1: chartGroup1,
    2: chartGroup2,
    3: chartGroup3,
    4: chartGroup4,
    'default': defaultDashboard
};

export default dashboardConfigs; 