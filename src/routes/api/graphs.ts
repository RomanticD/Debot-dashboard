import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'
import {Graph} from "~/components/Graph/utils/graphs";

export const APIRoute = createAPIFileRoute('/api/graphs')({
  GET: async ({ request }) => {
    console.info('Mocking graphs list... @', request.url)
    
    const mockGraphs = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `图表 ${i + 1}`,
    }));

    return json(mockGraphs);
  },
})
