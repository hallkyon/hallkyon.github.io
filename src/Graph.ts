import type GraphInterface from './interfaces/GraphInterface';

export default class Graph<Type> implements GraphInterface<Type> {
    private readonly _adjacencyList: Map<Type, Type[]>;

    constructor() {
        this._adjacencyList = new Map<Type, Type[]>();
    }

    public insertVertex(vertex: Type): void {
        if (this._adjacencyList.has(vertex)) {
            throw new Error(`Vertex ${vertex} already exist in graph`);
        }
        this._adjacencyList.set(vertex, []);
    }

    public insertDirectedEdge(vertexA: Type, vertexB: Type): void {
        if (false === this._adjacencyList.has(vertexA)) {
            throw new Error(`Vertex ${vertexA} not found in graph.`);
        }
        if (false === this._adjacencyList.has(vertexB)) {
            throw new Error(`Vertex ${vertexB} not found in graph.`);
        }
        const adjacentVertices = this._adjacencyList.get(vertexA);
        if (undefined === adjacentVertices) {
            throw new Error(`Vertex ${vertexA} not found in graph.`);
        }
        adjacentVertices.push(vertexB);
        this._adjacencyList.set(vertexA, adjacentVertices);
    }

    public insertUndirectedEdge(vertexA: Type, vertexB: Type): void {
        this.insertDirectedEdge(vertexA, vertexB);
        this.insertDirectedEdge(vertexB, vertexA);
    }

    public getAdjacentVertices(vertex: Type): Type[] {
        if (false === this._adjacencyList.has(vertex)) {
            throw new Error(`Vertex ${vertex} not found in graph.`);
        }
        const adjacentVertices = this._adjacencyList.get(vertex);
        if (undefined === adjacentVertices) {
            // Shouldn't happen, but just in case
            return [];
        }
        return adjacentVertices;
    }

    public getNonAdjacentVertices(vertex: Type): Type[] {
        const adjacentVertices = this.getAdjacentVertices(vertex);
        const nonAdjacentVertices = this.vertices.filter((v) => {
            return false === adjacentVertices.includes(v) && v !== vertex;
        });
        return nonAdjacentVertices;
    }

    public get vertices(): Type[] {
        return Array.from(this._adjacencyList.keys());
    }

    public get edges(): Type[][] {
        const edges: Type[][] = [];
        this._adjacencyList.forEach((value: Type[], key: Type) => {
            const vertexA = key;
            value.forEach((vertexB: Type) => {
                edges.push([vertexA, vertexB]);
            });
        });
        return edges;
    }
}
