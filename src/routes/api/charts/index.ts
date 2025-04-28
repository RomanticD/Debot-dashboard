import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'
import { getAllApiEndpoints } from '~/components/Graph/dashboards/dashboardConfig'

export const APIRoute = createAPIFileRoute('/api/charts')({
    GET: async ({ request }) => {
        // Extract path from request URL
        const url = new URL(request.url);
        const path = url.pathname;

        // If this is the exact /api/charts endpoint, return a list of available chart endpoints
        if (path === '/api/charts') {
            const endpoints = getAllApiEndpoints();
            return json({
                message: 'Charts API',
                description: 'Use specific chart endpoints to get chart data',
                availableEndpoints: endpoints.map(e => e.path)
            });
        }

        // For all other paths, find the matching endpoint configuration
        const endpoints = getAllApiEndpoints();
        const matchingEndpoint = endpoints.find(endpoint => endpoint.path === path);

        if (!matchingEndpoint) {
            console.warn(`No chart data found for path: ${path}`);
            return json({ error: 'Chart data not found' }, { status: 404 });
        }

        try {
            const data = matchingEndpoint.dataGetter();
            return json(data);
        } catch (error) {
            console.error(`Error retrieving data for path ${path}:`, error);
            return json({ error: 'Failed to get chart data' }, { status: 500 });
        }
    },
})