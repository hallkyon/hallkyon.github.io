// @prettier

import VertexInterface from './VertexInterface.js';

export default interface GraphInterface {
    insertVertex(vertex: VertexInterface): void;
    insertUndirectedEdge(
        vertexA: VertexInterface,
        vertexB: VertexInterface
    ): void;
    insertDirectedEdge(
        vertexA: VertexInterface,
        vertexB: VertexInterface
    ): void;
    getAdjacentVertices(vertex: VertexInterface): VertexInterface[];
    getNonAdjacentVertices(vertex: VertexInterface): VertexInterface[];
    get vertices(): VertexInterface[];
    get edges(): VertexInterface[][];
}
