// @prettier
export default class Edge {
    constructor(reference) {
        this._reference = reference;
    }
    get reference() {
        return this._reference;
    }
    set reference(newReference) {
        this._reference = newReference;
    }
}
