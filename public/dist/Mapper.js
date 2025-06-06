import Graph from './Graph.js';
export default class Mapper {
    static randomGraph(order) {
        const graph = new Graph();
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
    static getGraph() {
        return Mapper.randomGraph(30);
    }
}
//# sourceMappingURL=Mapper.js.map