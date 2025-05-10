// @prettier

import EdgeInterface from './interfaces/EdgeInterface';
import Vertex from './Vertex';

export default class Edge implements EdgeInterface {
    private _vertexA: Vertex;
    private _vertexB: Vertex;

    constructor(vertexA: Vertex, vertexB: Vertex) {
        this._vertexA = vertexA;
        this._vertexB = vertexB;
    }

    get vertexA(): Vertex {
        return this._vertexA;
    }

    set vertexA(newVertex: Vertex) {
        this._vertexA = newVertex;
    }

    get vertexB(): Vertex {
        return this._vertexB;
    }

    set vertexB(newVertex: Vertex) {
        this._vertexB = newVertex;
    }
}
