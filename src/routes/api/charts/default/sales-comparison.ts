import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'
import MockData from '~/components/Graph/data/mockData'

export const APIRoute = createAPIFileRoute('/api/charts/default/sales-comparison')({
  GET: async ({ request }) => {
    console.info('Fetching Default dashboard sales comparison chart data... @', request.url)
    
    // Return the mock data that was previously hardcoded
    return json(MockData.bar.basic.salesComparison)
  },
}) 