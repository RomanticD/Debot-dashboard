import QueryEnabledChart from './QueryEnabledChart';
import { DashboardConfig } from '~/components/Graph/types/charts';
import { useTheme } from '~/components/Graph/context/ThemeContext';

// 仪表盘组件
function Dashboard({ config }: { config: DashboardConfig }) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    
    return (
        <div className={`w-full pr-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
            <div className="mb-6 px-4">
                <div className="flex items-center gap-3">
                    <h4 className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                        {config.title}
                    </h4>
                    {config.description && (
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {config.description}
                        </p>
                    )}
                </div>
                <div className={`mt-3 h-1 w-20 rounded ${isDark ? 'bg-blue-500' : 'bg-blue-600'}`} />
            </div>
            
            <div className="grid grid-cols-1 gap-6 w-full">
                {config.charts.map((chartConfig, index) => (
                    <div 
                        key={index} 
                        className={`rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} w-full
                            shadow-md border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
                    >
                        <div className="rounded-md overflow-hidden w-full">
                            <QueryEnabledChart config={chartConfig} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard; 