import {createFileRoute, Link, Outlet} from '@tanstack/react-router'
import {DEPLOY_URL, type Graph} from "~/components/Graph/utils/graphs";
import GraphContextWrapper from '~/components/Graph/GraphContextWrapper';
import { useTheme } from '~/components/Graph/context/ThemeContext';

export const Route = createFileRoute('/graphs')({
    loader: async () => {
        try {
            const res = await fetch(DEPLOY_URL + '/api/graphs')
            if (!res.ok) {
                throw new Error('Unexpected status code')
            }

            const data = (await res.json()) as Array<Graph>

            return data
        } catch {
            throw new Error('Failed to fetch graphs')
        }
    },
    component: GraphsLayoutComponent,
})

function GraphsLayoutComponent() {
    const graphs = Route.useLoaderData();
    const { theme } = useTheme();

    return (
        <GraphContextWrapper>
            <div className={`flex gap-2 w-full theme-${theme}`}>
                <div className={`w-64 border rounded-lg ${theme === 'dark' ? 'border-gray-700 bg-gray-800/30' : 'border-gray-200 bg-gray-50/80'} p-3 shadow-sm`}>
                    <h3 className={`text-lg font-medium mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>图表分组</h3>
                    <ul className="space-y-1">
                        {[
                            ...graphs
                        ].map((graph) => {
                            return (
                                <li key={graph.id} className="whitespace-nowrap">
                                    <Link
                                        to="/graphs/$graphId"
                                        params={{
                                            graphId: String(graph.id),
                                        }}
                                        className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                                            theme === 'dark' 
                                                ? 'text-white hover:bg-gray-700 hover:text-blue-300' 
                                                : 'text-black hover:bg-gray-200/70 hover:text-blue-600'
                                        }`}
                                        activeProps={{ 
                                            className: theme === 'dark' 
                                                ? 'bg-gray-700 text-white font-medium' 
                                                : 'bg-gray-200 text-black font-medium' 
                                        }}
                                    >
                                        <div>{graph.name}</div>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="flex-1 overflow-x-auto">
                    <Outlet />
                </div>
            </div>
        </GraphContextWrapper>
    )
}
