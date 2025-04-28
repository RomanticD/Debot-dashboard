import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { DefaultCatchBoundary } from './components/Graph/widget/DefaultCatchBoundary'
import { NotFound } from './components/Graph/widget/NotFound'
import {registerChartApiRoutes} from "~/routes/api/charts/apiRouteUtils";

export function createRouter() {
  // Register chart API routes for documentation and validation
  if (typeof window !== 'undefined') {
    // Only run on client side
    registerChartApiRoutes();
  }

  const router = createTanStackRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
    scrollRestoration: true,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}