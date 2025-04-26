import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'
import MockData from '~/components/Graph/data/mockData'

export const APIRoute = createAPIFileRoute('/api/charts/default/website-traffic')({
  GET: async ({ request }) => {
    console.info('Fetching Default dashboard website traffic chart data... @', request.url)
    
    // Return the mock data that was previously hardcoded
    return json(MockData.line.basic.websiteTraffic)
  },
}) 