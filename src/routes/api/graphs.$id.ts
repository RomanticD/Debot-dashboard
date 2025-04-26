import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'
import type { Graph } from '../../components/Graph/utils/graphs'

export const APIRoute = createAPIFileRoute('/api/graphs/$id')({
    GET: async ({ request, params }) => {
        console.info(`Mocking graph data for id=${params.id}... @`, request.url)
        
        const mockGraph = {
            id: Number(params.id),
            name: `模拟图表 ${params.id}`,
        }

        return json({
            id: mockGraph.id,
            name: mockGraph.name
        })
    },
})
