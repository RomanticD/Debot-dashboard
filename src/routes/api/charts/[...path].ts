import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'
import { getAllApiEndpoints } from '~/components/Graph/dashboards/dashboardConfig'

// Get all registered API endpoints from the dashboard configuration
const apiEndpoints = getAllApiEndpoints();

export const APIRoute = createAPIFileRoute('/api/charts/[/path]')({
    GET: async ({ request, params }) => {
        // Get the full path from the request URL
        const fullPath = request.url;
        console.info('Dynamic chart API request received for:', fullPath);

        // Extract the specific path part after the origin
        const urlObj = new URL(fullPath);
        const pathPart = urlObj.pathname;

        // Find the matching endpoint in our configuration
        const matchingEndpoint = apiEndpoints.find(endpoint => endpoint.path === pathPart);

        if (!matchingEndpoint) {
            console.error(`No API endpoint configured for path: ${pathPart}`);
            return json({ error: 'Chart data not found' }, { status: 404 });
        }

        try {
            // Get the data using the configured data getter function
            const chartData = matchingEndpoint.dataGetter();
            return json(chartData);
        } catch (error) {
            console.error(`Error getting chart data for ${pathPart}:`, error);
            return json({ error: 'Failed to get chart data' }, { status: 500 });
        }
    },
})