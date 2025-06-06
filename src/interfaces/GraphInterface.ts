// @prettier

export default interface GraphInterface<Type> {
    insertVertex(vertex: Type): void;
    insertUndirectedEdge(vertexA: Type, vertexB: Type): void;
    insertDirectedEdge(vertexA: Type, vertexB: Type): void;
    getAdjacentVertices(vertex: Type): Type[];
    getNonAdjacentVertices(vertex: Type): Type[];
    get vertices(): Type[];
    get edges(): Type[][];
}
