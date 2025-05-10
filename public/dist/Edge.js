// @prettier
export default class Edge {
    constructor(vertexA, vertexB) {
        this._vertexA = vertexA;
        this._vertexB = vertexB;
    }
    get vertexA() {
        return this._vertexA;
    }
    set vertexA(newVertex) {
        this._vertexA = newVertex;
    }
    get vertexB() {
        return this._vertexB;
    }
    set vertexB(newVertex) {
        this._vertexB = newVertex;
    }
}
//# sourceMappingURL=Edge.js.map