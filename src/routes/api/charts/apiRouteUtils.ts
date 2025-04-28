import { getAllApiEndpoints } from '~/components/Graph/dashboards/dashboardConfig';

/**
 * Registers all chart API routes with the application
 * This is called during the application initialization
 *
 * Note: This function doesn't actually need to register anything since
 * we're using a wildcard route handler, but it's useful for validation
 * and possibly future enhancements.
 */
export function registerChartApiRoutes(): void {
    // Get all endpoints
    const endpoints = getAllApiEndpoints();

    // Log registered endpoints for debugging
    console.info(`Registered ${endpoints.length} chart API endpoints:`);
    endpoints.forEach(endpoint => {
        console.info(`- ${endpoint.path}`);
    });

    // Validate that there are no duplicate paths
    const pathsSet = new Set<string>();
    endpoints.forEach(endpoint => {
        if (pathsSet.has(endpoint.path)) {
            console.warn(`Warning: Duplicate API path detected: ${endpoint.path}`);
        }
        pathsSet.add(endpoint.path);
    });
}