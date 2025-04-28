import { ChartType, ChartConfig, DashboardConfig } from '~/components/Graph/types/charts';

/**
 * Dashboard definition interface - simplified configuration
 * for creating dashboards with less boilerplate
 */
export interface DashboardDefinition {
    id: string | number;
    title: string;
    description?: string;
    charts: ChartConfig[];
}

/**
 * Simplified dashboard creation function
 * Takes a simple configuration object instead of requiring class implementation
 */
export function createDashboard(definition: DashboardDefinition): DashboardConfig {
    return {
        title: definition.title,
        description: definition.description,
        charts: definition.charts,
    };
}

/**
 * Convert an array of dashboard definitions into a record
 * for easy lookup by ID
 */
export function createDashboardRegistry(
    definitions: DashboardDefinition[]
): Record<string | number, DashboardConfig> {
    return definitions.reduce((registry, definition) => {
        registry[definition.id] = createDashboard(definition);
        return registry;
    }, {} as Record<string | number, DashboardConfig>);
}