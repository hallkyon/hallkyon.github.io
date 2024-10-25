// @prettier

import Graph from './Graph.js';
import Vertex from './Vertex.js';
import EadesEmbedder from './EadesEmbedder.js';
// import EadesStrategy from './EadesStrategy.js';

import Canvas from './Canvas.js';

function makeRandomGraph(order: number): Graph {
    const graph = new Graph();

    for (let i = 0; i < order; i++) {
        const vertex = new Vertex(new String(String(i)));
        graph.insertVertex(vertex);
    }

    graph.vertices.forEach((vertexA) => {
        graph.vertices.forEach((vertexB) => {
            if (vertexA === vertexB) {
                return;
            }
            if (Math.random() > 0.97) {
                graph.insertUndirectedEdge(vertexA, vertexB);
            }
        });
    });

    return graph;
}

function main() {
    const canvas = Canvas.getInstance();

    const graph = makeRandomGraph(30);
    canvas.setEmbedder(graph, EadesEmbedder.embedder);
}

main();
