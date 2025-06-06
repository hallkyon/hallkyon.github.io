// @prettier

import GraphInterface from './interfaces/GraphInterface';

export default class Graph<Type> implements GraphInterface<Type> {
    private readonly _adjacencyList: Map<Type, Type[]>;

    constructor() {
        this._adjacencyList = new Map<Type, Type[]>();
    }

    public insertVertex(vertex: Type): void {
        if (false === this._adjacencyList.has(vertex)) {
            this._adjacencyList.set(vertex, []);
        }
    }

    public insertDirectedEdge(vertexA: Type, vertexB: Type): void {
        if (false === this._adjacencyList.has(vertexA)) {
            this._adjacencyList.set(vertexA, []);
        }
        if (false === this._adjacencyList.has(vertexB)) {
            this._adjacencyList.set(vertexB, []);
        }
        const adjacentVertices = this._adjacencyList.get(vertexA);
        if (undefined === adjacentVertices) {
            return;
        }
        adjacentVertices.push(vertexB);
        this._adjacencyList.set(vertexA, adjacentVertices);
    }

    public insertUndirectedEdge(vertexA: Type, vertexB: Type): void {
        this.insertDirectedEdge(vertexA, vertexB);
        this.insertDirectedEdge(vertexB, vertexA);
    }

    public getAdjacentVertices(vertex: Type): Type[] {
        const adjacentVertices = this._adjacencyList.get(vertex);
        if (undefined === adjacentVertices) {
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
