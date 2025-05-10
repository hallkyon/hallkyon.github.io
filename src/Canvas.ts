// @prettier

import Graph from './Graph.js';
import Point from './Point.js';

export default class Canvas {
    private static instance: Canvas;
    private _embedder: ((graph: Graph) => void) | null;
    private _graph: Graph | null;

    private constructor() {
        this._embedder = null;
        this._graph = null;
    }

    public static get height(): number {
        return window.innerHeight;
    }

    public static get width(): number {
        return window.innerWidth;
    }

    public static get center(): Point {
        return new Point(Canvas.width / 2, Canvas.height / 2);
    }

    public static getInstance(): Canvas {
        if (!Canvas.instance) {
            Canvas.instance = new Canvas();
        }
        return Canvas.instance;
    }

    public static addDrawing(drawing: SVGElement): void {
        const canvas = document.getElementById('svg');
        if (null === canvas) {
            throw new Error('Canvas element with id "svg" not found');
        }
        canvas.appendChild(drawing);
    }

    public static removeDrawing(drawing: SVGElement): void {
        const canvas = document.getElementById('svg');
        if (null === canvas) {
            throw new Error('Canvas element with id "svg" not found');
        }
        canvas.removeChild(drawing);
    }

    public setEmbedder(graph: Graph, embedder: (graph: Graph) => void) {
        this._graph = graph;
        this._embedder = embedder;
        requestAnimationFrame(this.animate.bind(this));
    }

    private readonly animate = (timestamp: number) => {
        if (!this._embedder || !this._graph) {
            throw new Error('Embedder or graph not set');
        }
        this._embedder(this._graph);
        requestAnimationFrame(this.animate.bind(this));
    };
}
