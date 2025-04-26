import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'
import MockData from '~/components/Graph/data/mockData'

export const APIRoute = createAPIFileRoute('/api/charts/dashboard3/payment-methods')({
  GET: async ({ request }) => {
    console.info('Fetching Dashboard3 payment methods chart data... @', request.url)
    
    // Return the mock data that was previously hardcoded
    return json(MockData.pie.doughnut.paymentMethods)
  },
}) 