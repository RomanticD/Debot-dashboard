import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'
import MockData from '~/components/Graph/data/mockData'

export const APIRoute = createAPIFileRoute('/api/charts/dashboard2/drink-preferences')({
  GET: async ({ request }) => {
    console.info('Fetching Dashboard2 drink preferences chart data... @', request.url)
    
    // Return the mock data that was previously hardcoded
    return json(MockData.pie.rose.drinkPreferences)
  },
})