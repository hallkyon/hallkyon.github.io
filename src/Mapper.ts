import Graph from './Graph.js';

export default class Mapper {
    private static randomGraph(order: number): Graph<number> {
        const graph = new Graph<number>();

        for (let i = 0; i < order; i++) {
            graph.insertVertex(i);
        }

        graph.vertices.forEach((vertexA) => {
            graph.vertices.forEach((vertexB) => {
                if (vertexA === vertexB) {
                    return;
                }
                if (Math.random() > 0.98) {
                    graph.insertUndirectedEdge(vertexA, vertexB);
                }
            });
        });

        return graph;
    }

    public static getGraph(): Graph<number> {
        return Mapper.randomGraph(30);
    }
}
