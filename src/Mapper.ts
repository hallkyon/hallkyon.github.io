import Graph from './Graph';
import DrawingVertex from './DrawingVertex';


export default class Mapper {
    private static toGraph(response: string): Graph<DrawingVertex> {
        const drawingMap = new Map<string, DrawingVertex>();
        const graph = new Graph<DrawingVertex>();
        const data = JSON.parse(response);

        console.log(data);

        data['nodes'].forEach((vertex: { id: string; labels: string[], properties: Object}) => {
            const titel = vertex.properties.title || 'No Title';
            const drawingVertex = new DrawingVertex(
                0,
                0,
                vertex.id,
                vertex.title
            );
            graph.insertVertex(drawingVertex);
            drawingMap.set(vertex.id, drawingVertex);
        });

        data['edges'].forEach((edge: { [key: string]: string[] }) => {
            Object.keys(edge).forEach((vertexA: string) => {
                edge[vertexA].forEach((vertexB: string) => {
                    const drawingA = drawingMap.get(vertexA);
                    const drawingB = drawingMap.get(vertexB);
                    if (drawingA === undefined || drawingB === undefined) {
                        throw new Error('Vertices not found in map');
                    }
                    graph.insertUndirectedEdge(drawingA, drawingB);
                });
            });
        });

        return graph;
    }

    private static async getData() {
        const url = 'http://localhost:5173/graph.json';
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            return JSON.stringify(result);
        } catch (error) {
            console.error(
                error instanceof Error ? error.message : String(error)
            );
        }
    }

    public static async getGraph(): Promise<Graph<DrawingVertex>> {
        try {
            const graph = await this.getData();
            if (graph === undefined) {
                throw new Error('Failed to fetch graph data');
            }
            return this.toGraph(graph);
        } catch {
            throw new Error(
                '500 Internal Server Error: Using default graph data.'
            );
        }
    }
}
