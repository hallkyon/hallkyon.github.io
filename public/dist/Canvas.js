// @prettier
import Point from './Point.js';
export default class Canvas {
    constructor() {
        this.animate = (timestamp) => {
            if (!this._embedder || !this._graph) {
                throw new Error('Embedder or graph not set');
            }
            this._embedder(this._graph);
            requestAnimationFrame(this.animate.bind(this));
        };
        this._embedder = null;
        this._graph = null;
    }
    static get height() {
        return window.innerHeight;
    }
    static get width() {
        return window.innerWidth;
    }
    static get center() {
        return new Point(Canvas.width / 2, Canvas.height / 2);
    }
    static getInstance() {
        if (!Canvas.instance) {
            Canvas.instance = new Canvas();
        }
        return Canvas.instance;
    }
    static addDrawing(drawing) {
        const canvas = document.getElementById('svg');
        if (null === canvas) {
            throw new Error('Canvas element with id "svg" not found');
        }
        canvas.appendChild(drawing);
    }
    static removeDrawing(drawing) {
        const canvas = document.getElementById('svg');
        if (null === canvas) {
            throw new Error('Canvas element with id "svg" not found');
        }
        canvas.removeChild(drawing);
    }
    setEmbedder(graph, embedder) {
        this._graph = graph;
        this._embedder = embedder;
        requestAnimationFrame(this.animate.bind(this));
    }
}
//# sourceMappingURL=Canvas.js.map