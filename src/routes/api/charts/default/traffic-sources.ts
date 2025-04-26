import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'
import MockData from '~/components/Graph/data/mockData'

export const APIRoute = createAPIFileRoute('/api/charts/default/traffic-sources')({
  GET: async ({ request }) => {
    console.info('Fetching Default dashboard traffic sources chart data... @', request.url)
    
    // Return the mock data that was previously hardcoded
    return json(MockData.pie.basic.trafficSources)
  },
}) 