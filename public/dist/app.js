// @prettier
import Canvas from './Canvas.js';
import EadesEmbedder from './EadesEmbedder.js';
import Graph from './Graph.js';
import Vertex from './Vertex.js';
function makeRandomGraph(order) {
    const graph = new Graph();
    for (let i = 0; i < order; i++) {
        const vertex = new Vertex(null);
        graph.insertVertex(vertex);
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
function main() {
    const canvas = Canvas.getInstance();
    const graph = makeRandomGraph(1);
    canvas.setEmbedder(graph, EadesEmbedder.embedder);
}
main();
//# sourceMappingURL=app.js.map