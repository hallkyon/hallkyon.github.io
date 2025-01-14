// @prettier

import VertexInterface from './interfaces/VertexInterface.js';

export default class Vertex implements VertexInterface {
    private _reference: object | null;

    constructor(reference: object | null) {
        this._reference = reference;
    }

    public get reference(): object | null {
        return this._reference;
    }

    public set reference(newReference: object | null) {
        this._reference = newReference;
    }
}
