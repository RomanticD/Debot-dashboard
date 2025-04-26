import { QueryClientProvider } from '~/components/Graph/context/QueryClientProvider';
import Chart from './Chart';
import { ChartConfig } from '~/components/Graph/types/charts';

// 封装了 QueryClientProvider 的 Chart 组件
function QueryEnabledChart({ config }: { config: ChartConfig }) {
  return (
    <QueryClientProvider>
      <Chart config={config} />
    </QueryClientProvider>
  );
}

export default QueryEnabledChart; 