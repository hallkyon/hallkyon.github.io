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
    private _boundary: Boundary;

    private _c1 = 10;
    private _c2 = 50;
    private _c3 = 2;
    private static _c4 = 0.5;

    private constructor() {
        this._vertexMap = new Map<Vertex, PointMass>();
        this._edgeMap = new Map<DrawingLine, Vertex[]>();

        this._boundary = new Boundary(
            Canvas.width / 2,
            Canvas.height / 2,
            new DrawingCircle()
        );
    }

    public static getInstance(): EadesEmbedder {
        if (!EadesEmbedder.instance) {
            EadesEmbedder.instance = new EadesEmbedder();
        }
        return EadesEmbedder.instance;
    }

    public calculateSpringForce(vertexA: Vertex, vertexB: Vertex): Vector {
        const instance = EadesEmbedder.getInstance();
        const pointMassA = instance._vertexMap.get(vertexA);
        const pointMassB = instance._vertexMap.get(vertexB);
        if (!pointMassA || !pointMassB) {
            throw new Error('PointMass for one or both vertices is undefined.');
        }
        const distance = pointMassA.getDistance(pointMassB.position);
        const direction = pointMassA.getDirection(pointMassB.position);
        const springForce =
            distance > 0
                ? direction.scale(this._c1 * Math.log(distance / this._c2))
                : new Vector(0, 0);
        return springForce;
    }

    public calculateRepulsionForce(vertexA: Vertex, vertexB: Vertex): Vector {
        const instance = EadesEmbedder.getInstance();
        const pointMassA = instance._vertexMap.get(vertexA);
        const pointMassB = instance._vertexMap.get(vertexB);
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

    public static embedder(graph: Graph): void {
        const instance = EadesEmbedder.getInstance();
        if (0 === instance._vertexMap.size) {
            graph.vertices.forEach((vertex) => {
                const pointMass = new PointMass(
                    Canvas.width / 2,
                    Canvas.height / 2,
                    new DrawingPoint()
                );
                instance._vertexMap.set(vertex, pointMass);
                instance._boundary.insert(pointMass);
            });
        }

        if (0 === instance._edgeMap.size) {
            graph.edges.forEach((edge) => {
                const line = new DrawingLine(new Point(0, 0), new Point(0, 0));
                line.show(true);
                instance._edgeMap.set(line, edge);
            });
        }

        graph.vertices.forEach((vertexA) => {
            const pointMassA = instance._vertexMap.get(vertexA);
            if (!pointMassA) {
                throw new Error(
                    `PointMass for vertex ${vertexA} is undefined.`
                );
            }
            let force = pointMassA.force;
            graph.getAdjacentVertices(vertexA).forEach((vertexB) => {
                if (vertexA === vertexB) {
                    return;
                }
                force = force.add(
                    instance.calculateSpringForce(vertexA, vertexB)
                );
            });
            graph.getNonAdjacentVertices(vertexA).forEach((vertexB) => {
                if (vertexA === vertexB) {
                    return;
                }
                force = force.add(
                    instance.calculateRepulsionForce(vertexA, vertexB)
                );
            });
            pointMassA.force = force.scale(EadesEmbedder._c4);
            pointMassA.applyForce();
        });

        instance._edgeMap.forEach((edge, line) => {
            const pointMassA = instance._vertexMap.get(edge[0]);
            if (!pointMassA) {
                throw new Error(
                    `PointMass for vertex ${edge[0]} is undefined.`
                );
            }
            const pointMassB = instance._vertexMap.get(edge[1]);
            if (!pointMassB) {
                throw new Error(
                    `PointMass for vertex ${edge[1]} is undefined.`
                );
            }
            line.pointA = pointMassA.position;
            line.pointB = pointMassB.position;
        });
    }
}
