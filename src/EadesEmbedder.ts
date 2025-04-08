// @prettier

import Canvas from './Canvas.js';
import DrawingLine from './DrawingLine.js';
import DrawingCircle from './DrawingCircle.js';
import Graph from './Graph.js';
import Point from './Point.js';
import PointMass from './PointMass.js';
import Vertex from './Vertex.js';
import Vector from './Vector.js';

export default class EadesEmbedder {
    private static instance: EadesEmbedder;
    private readonly _vertexMap: Map<Vertex, PointMass> = new Map<
        Vertex,
        PointMass
    >();
    private readonly _edgeMap: Map<DrawingLine, Vertex[]> = new Map<
        DrawingLine,
        Vertex[]
    >();
    private readonly _pointMassDrawingMap: Map<PointMass, DrawingCircle> =
        new Map<PointMass, DrawingCircle>();
    private readonly _center: PointMass;

    private readonly _c0 = 0.2; // center attraction constant
    private readonly _c1 = 10;
    private readonly _c2 = 50;
    private readonly _c3 = 2;
    private static readonly _c4 = 0.5;

    private constructor(graph: Graph) {
        this._center = new PointMass(Canvas.center.x, Canvas.center.y);
        const centerDrawing = new DrawingCircle();
        centerDrawing.fill = 'none';
        centerDrawing.stroke = 'white';
        centerDrawing.radius = 3;
        centerDrawing.show();
        this._pointMassDrawingMap.set(this._center, centerDrawing);

        graph.vertices.forEach((vertex) => {
            const pointMass = new PointMass(Canvas.center.x, Canvas.center.y);
            const pointMassDrawing = new DrawingCircle();
            pointMassDrawing.fill = 'white';
            pointMassDrawing.stroke = 'white';
            pointMassDrawing.radius = 3;
            pointMassDrawing.show();
            this._vertexMap.set(vertex, pointMass);
            this._pointMassDrawingMap.set(pointMass, pointMassDrawing);
        });

        graph.edges.forEach((edge) => {
            const line = new DrawingLine(new Point(0, 0), new Point(0, 0));
            this._edgeMap.set(line, edge);
        });
    }

    private static getInstance(graph: Graph): EadesEmbedder {
        if (!EadesEmbedder.instance) {
            EadesEmbedder.instance = new EadesEmbedder(graph);
        }
        return EadesEmbedder.instance;
    }

    private getPointMass(vertex: Vertex): PointMass {
        const pointMass = this._vertexMap.get(vertex);
        if (!pointMass) {
            throw new Error(`PointMass for vertex is undefined.`);
        }
        return pointMass;
    }

    private getDrawing(pointMass: PointMass): DrawingCircle {
        const drawing = this._pointMassDrawingMap.get(pointMass);
        if (!drawing) {
            throw new Error(`Drawing for point mass is undefined.`);
        }
        return drawing;
    }

    private calculateSpringScalar(distance: number): number {
        return this._c1 * Math.log(distance / this._c2);
    }

    private calculateRepulsionScalar(distance: number): number {
        return -this._c3 / Math.sqrt(distance);
    }

    private calculateCenterScalar(distance: number): number {
        return this._c0 * Math.sqrt(distance);
    }

    private calculateForce(
        pointMassA: PointMass,
        pointMassB: PointMass,
        scalarFunction: (distance: number) => number
    ): Vector {
        if (pointMassA === pointMassB) {
            return new Vector(0, 0);
        }
        try {
            const distance = pointMassA.getDistance(pointMassB);
            const direction = pointMassA.getDirection(pointMassB);
            return direction.scale(scalarFunction(distance));
        } catch {
            return new Vector(Math.random(), Math.random());
        }
    }

    private embed(graph: Graph): void {
        let boundaryRadius = 0;
        graph.vertices.forEach((vertexA) => {
            const pointMassA = this.getPointMass(vertexA);
            let force = pointMassA.force;
            force = force.add(
                this.calculateForce(
                    pointMassA,
                    this._center,
                    this.calculateCenterScalar.bind(this)
                )
            );
            graph.getAdjacentVertices(vertexA).forEach((vertexB) => {
                const pointMassB = this.getPointMass(vertexB);
                force = force.add(
                    this.calculateForce(
                        pointMassA,
                        pointMassB,
                        this.calculateSpringScalar.bind(this)
                    )
                );
            });
            graph.getNonAdjacentVertices(vertexA).forEach((vertexB) => {
                const pointMassB = this.getPointMass(vertexB);
                force = force.add(
                    this.calculateForce(
                        pointMassA,
                        pointMassB,
                        this.calculateRepulsionScalar.bind(this)
                    )
                );
            });
            pointMassA.force = force.scale(EadesEmbedder._c4);
            pointMassA.x = pointMassA.x + pointMassA.force.x;
            pointMassA.y = pointMassA.y + pointMassA.force.y;

            const pointMassDrawing = this.getDrawing(pointMassA);
            pointMassDrawing.x = pointMassA.x;
            pointMassDrawing.y = pointMassA.y;

            boundaryRadius = Math.max(
                boundaryRadius,
                pointMassA.getDistance(this._center)
            );
        });

        this._edgeMap.forEach((edge, line) => {
            const pointMassA = this.getPointMass(edge[0]);
            line.pointA = pointMassA.position;
            const pointMassB = this.getPointMass(edge[1]);
            line.pointB = pointMassB.position;
        });

        const centerDrawing = this.getDrawing(this._center);
        centerDrawing.radius = Math.max(boundaryRadius * 1.1, 10);
    }

    public static embedder(graph: Graph): void {
        const instance = EadesEmbedder.getInstance(graph);
        instance.embed(graph);
    }
}
