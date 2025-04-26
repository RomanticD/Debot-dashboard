import {createFileRoute} from '@tanstack/react-router'
import {NotFound} from "~/components/Graph/widget/NotFound";
import {GraphErrorComponent} from "~/components/Graph/widget/GraphError";
import Dashboard from '~/components/Graph/widget/Dashboard';
import chartGroupConfigs from '~/components/Graph/dashboards';

export const Route = createFileRoute('/graphs/$graphId')({
    loader: async ({ params: { graphId } }) => {
        return {
            id: Number(graphId),
            name: `模拟图表 ${graphId}`,
        };
    },
    errorComponent: GraphErrorComponent,
    component: GraphComponent,
    notFoundComponent: () => <NotFound>Graph not found</NotFound>,
});

function GraphComponent() {
    const graph = Route.useLoaderData();
    const dashboardConfig = chartGroupConfigs[graph.id] || chartGroupConfigs['default'];
    return <Dashboard config={dashboardConfig} />;
}