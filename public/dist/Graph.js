// @prettier
export default class Graph {
    constructor() {
        this._adjacencyList = new Map();
    }
    insertVertex(vertex) {
        if (false === this._adjacencyList.has(vertex)) {
            this._adjacencyList.set(vertex, []);
        }
    }
    insertDirectedEdge(vertexA, vertexB) {
        if (false === this._adjacencyList.has(vertexA)) {
<<<<<<< HEAD
            throw new Error(`Vertex ${vertexA} not found in graph.`);
        }
        if (false === this._adjacencyList.has(vertexB)) {
            throw new Error(`Vertex ${vertexB} not found in graph.`);
        }
        const adjacentVertices = this._adjacencyList.get(vertexA);
        if (undefined === adjacentVertices) {
            throw new Error(`Vertex ${vertexA} not found in graph.`);
=======
            this._adjacencyList.set(vertexA, []);
        }
        if (false === this._adjacencyList.has(vertexB)) {
            this._adjacencyList.set(vertexB, []);
        }
        const adjacentVertices = this._adjacencyList.get(vertexA);
        if (undefined === adjacentVertices) {
            return;
>>>>>>> d7f883a (work in progress)
        }
        adjacentVertices.push(vertexB);
        this._adjacencyList.set(vertexA, adjacentVertices);
    }
    insertUndirectedEdge(vertexA, vertexB) {
        this.insertDirectedEdge(vertexA, vertexB);
        this.insertDirectedEdge(vertexB, vertexA);
    }
    getAdjacentVertices(vertex) {
<<<<<<< HEAD
        if (false === this._adjacencyList.has(vertex)) {
            throw new Error(`Vertex ${vertex} not found in graph.`);
        }
        const adjacentVertices = this._adjacencyList.get(vertex);
        if (undefined === adjacentVertices) { // Shouldn't happen, but just in case
=======
        const adjacentVertices = this._adjacencyList.get(vertex);
        if (undefined === adjacentVertices) {
>>>>>>> d7f883a (work in progress)
            return [];
        }
        return adjacentVertices;
    }
    getNonAdjacentVertices(vertex) {
        const adjacentVertices = this.getAdjacentVertices(vertex);
        const nonAdjacentVertices = this.vertices.filter((v) => {
            return false === adjacentVertices.includes(v) && v !== vertex;
        });
        return nonAdjacentVertices;
    }
    get vertices() {
        return Array.from(this._adjacencyList.keys());
    }
    get edges() {
        const edges = [];
        this._adjacencyList.forEach((value, key) => {
            const vertexA = key;
            value.forEach((vertexB) => {
                edges.push([vertexA, vertexB]);
            });
        });
        return edges;
    }
}
//# sourceMappingURL=Graph.js.map