import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'
import MockData from '~/components/Graph/data/mockData'

export const APIRoute = createAPIFileRoute('/api/charts/dashboard2/product-category')({
  GET: async ({ request }) => {
    console.info('Fetching Dashboard2 product category chart data... @', request.url)
    
    // Return the mock data that was previously hardcoded
    return json(MockData.bar.multiSeries.productCategory)
  },
}) 