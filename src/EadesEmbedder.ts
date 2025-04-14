// @prettier

import Canvas from './Canvas.js';
import DrawingLine from './DrawingLine.js';
import DrawingPoint from './DrawingPoint.js';
import Graph from './Graph.js';
import Point from './Point.js';
import PointMass from './PointMass.js';
import Vertex from './Vertex.js';
import Vector from './Vector.js';

import DrawingCircle from './DrawingCircle.js';
import Boundary from './Boundary.js';

export default class EadesEmbedder {
    private static instance: EadesEmbedder;
    private _vertexMap: Map<Vertex, PointMass>;
    private _edgeMap: Map<DrawingLine, Vertex[]>;

    private _c1 = 10;
    private _c2 = 50;
    private _c3 = 2;
    private static _c4 = 0.5;

    private constructor(graph: Graph) {
        this._vertexMap = new Map<Vertex, PointMass>();
        this._edgeMap = new Map<DrawingLine, Vertex[]>();

        graph.vertices.forEach((vertex) => {
            const pointMass = new PointMass(
                Canvas.width / 2,
                Canvas.height / 2,
                new DrawingPoint()
            );
            this._vertexMap.set(vertex, pointMass);
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
            throw new Error(`PointMass for vertex ${vertex} is undefined.`);
        }
        return pointMass;
    }

    private calculateSpringForce(vertexA: Vertex, vertexB: Vertex): Vector {
        if (vertexA === vertexB) {
            return new Vector(0, 0);
        }

        const pointMassA = this._vertexMap.get(vertexA);
        const pointMassB = this._vertexMap.get(vertexB);
        if (!pointMassA || !pointMassB) {
            throw new Error('PointMass for one or both vertices is undefined.');
        }
        const distance = pointMassA.getDistance(pointMassB.position);
        const direction = pointMassA.getDirection(pointMassB.position);
        const springForce =
            distance > 0
                ? direction.scale(this._c1 * Math.log(distance / this._c2))
                : new Vector(Math.random(), Math.random());
        return springForce;
    }

    private calculateRepulsionForce(vertexA: Vertex, vertexB: Vertex): Vector {
        if (vertexA === vertexB) {
            return new Vector(0, 0);
        }

        const pointMassA = this._vertexMap.get(vertexA);
        const pointMassB = this._vertexMap.get(vertexB);
        if (!pointMassA || !pointMassB) {
            throw new Error('PointMass for one or both vertices is undefined.');
        }
        const distance = pointMassB.getDistance(pointMassA.position);
        const direction = pointMassB.getDirection(pointMassA.position);
        const repulsionForce =
            distance > 0
                ? direction.scale(this._c3 / Math.sqrt(distance))
                : new Vector(Math.random(), Math.random());
        return repulsionForce;
    }

    private embed(graph: Graph): void {
        graph.vertices.forEach((vertexA) => {
            const pointMassA = this.getPointMass(vertexA);
            let force = pointMassA.force;
            graph.getAdjacentVertices(vertexA).forEach((vertexB) => {
                force = force.add(this.calculateSpringForce(vertexA, vertexB));
            });
            graph.getNonAdjacentVertices(vertexA).forEach((vertexB) => {
                force = force.add(
                    this.calculateRepulsionForce(vertexA, vertexB)
                );
            });
            pointMassA.force = force.scale(EadesEmbedder._c4);
        });

        this._edgeMap.forEach((edge, line) => {
            const pointMassA = this.getPointMass(edge[0]);
            line.pointA = pointMassA.position;
            const pointMassB = this.getPointMass(edge[1]);
            line.pointB = pointMassB.position;
        });
    }

    public static embedder(graph: Graph): void {
        const instance = EadesEmbedder.getInstance(graph);
        instance.embed(graph);
    }
}
