import Graph from './Graph';
import Canvas from './Canvas';
import DrawingVertex from './DrawingVertex';

interface Node {
    id: string;
    labels: string[];
    properties: Record<string, string>;
}

interface Relationship {
    id: string;
    type: string;
    from: string;
    to: string;
    properties: Record<string, string>;
}

interface GraphData {
    nodes: Node[];
    rels: Relationship[];
}

export default class Mapper {
    private static toGraph(data: GraphData): Graph<DrawingVertex> {
        const graph = new Graph<DrawingVertex>();
        const drawingMap = new Map<string, DrawingVertex>();

        data.nodes.forEach((node: Node) => {
            const title = node.properties.title || 'Untitled';
            const canvas = Canvas.getInstance();
            const drawingVertex = new DrawingVertex(
                canvas.center.x,
                canvas.center.y,
                node.id,
                title
            );
            graph.insertVertex(drawingVertex);
            drawingMap.set(node.id, drawingVertex);
        });

        data.rels.forEach((rel: Relationship) => {
            const drawingA = drawingMap.get(rel.from);
            const drawingB = drawingMap.get(rel.to);
            if (drawingA === undefined || drawingB === undefined) {
                throw new Error(`${rel.from} or ${rel.to} not found in map`);
            }
            graph.insertUndirectedEdge(drawingA, drawingB);
        });

        return graph;
    }

    public static async getGraph(): Promise<Graph<DrawingVertex>> {
        try {
            const response = await fetch('graph.json');
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result: GraphData = await response.json();
            return this.toGraph(result);
        } catch (error) {
            console.error(
                error instanceof Error ? error.message : String(error)
            );
            throw error;
        }
    }
}
