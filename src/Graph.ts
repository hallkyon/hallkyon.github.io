// @prettier

import GraphInterface from './interfaces/GraphInterface';
import Vertex from './Vertex.js';

export default class Graph implements GraphInterface {
    private readonly _adjacencyList: Map<Vertex, Vertex[]>;

    constructor() {
        this._adjacencyList = new Map<Vertex, Vertex[]>();
    }

    public insertVertex(vertex: Vertex): void {
        if (false === this._adjacencyList.has(vertex)) {
            this._adjacencyList.set(vertex, []);
        }
    }

    public insertDirectedEdge(vertexA: Vertex, vertexB: Vertex): void {
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

    public insertUndirectedEdge(vertexA: Vertex, vertexB: Vertex): void {
        this.insertDirectedEdge(vertexA, vertexB);
        this.insertDirectedEdge(vertexB, vertexA);
    }

    public getAdjacentVertices(vertex: Vertex): Vertex[] {
        const adjacentVertices = this._adjacencyList.get(vertex);
        if (undefined === adjacentVertices) {
            return [];
        }
        return adjacentVertices;
    }

    public getNonAdjacentVertices(vertex: Vertex): Vertex[] {
        const adjacentVertices = this.getAdjacentVertices(vertex);
        const nonAdjacentVertices = this.vertices.filter((v) => {
            return false === adjacentVertices.includes(v) && v !== vertex;
        });
        return nonAdjacentVertices;
    }

    public get vertices(): Vertex[] {
        return Array.from(this._adjacencyList.keys());
    }

    public get edges(): Vertex[][] {
        const edges: Vertex[][] = [];
        this._adjacencyList.forEach((value: Vertex[], key: Vertex) => {
            const vertexA = key;
            value.forEach((vertexB: Vertex) => {
                edges.push([vertexA, vertexB]);
            });
        });
        return edges;
    }
}
