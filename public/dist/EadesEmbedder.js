// @prettier
import Canvas from './Canvas.js';
import DrawingLine from './DrawingLine.js';
import Point from './Point.js';
import PointMass from './PointMass.js';
import Vector from './Vector.js';
export default class EadesEmbedder {
    constructor() {
        this._vertexMap = new Map();
        this._edgeMap = new Map();
        this._center = new PointMass(Canvas.width / 2, Canvas.height / 2);
    }
    static getInstance() {
        if (!EadesEmbedder.instance) {
            EadesEmbedder.instance = new EadesEmbedder();
        }
        return EadesEmbedder.instance;
    }
    calculateCenterForce(vertex) {
        const instance = EadesEmbedder.getInstance();
        const pointMass = instance._vertexMap.get(vertex);
        if (!pointMass) {
            throw new Error('PointMass is undefined.');
        }
        const distance = pointMass.getDistance(this._center);
        const direction = pointMass.getDirection(this._center);
        const centerForce = direction.scale(Math.log(distance));
        return centerForce;
    }
    calculateSpringForce(vertexA, vertexB) {
        const instance = EadesEmbedder.getInstance();
        const pointMassA = instance._vertexMap.get(vertexA);
        const pointMassB = instance._vertexMap.get(vertexB);
        if (!pointMassA || !pointMassB) {
            throw new Error('PointMass for one or both vertices is undefined.');
        }
        const distance = pointMassA.getDistance(pointMassB);
        const direction = pointMassA.getDirection(pointMassB);
        const springForce = direction.scale(Math.log(distance / 100));
        return springForce;
    }
    calculateRepulsionForce(vertexA, vertexB) {
        const instance = EadesEmbedder.getInstance();
        const pointMassA = instance._vertexMap.get(vertexA);
        const pointMassB = instance._vertexMap.get(vertexB);
        if (!pointMassA || !pointMassB) {
            throw new Error('PointMass for one or both vertices is undefined.');
        }
        const distance = pointMassB.getDistance(pointMassA);
        const direction = pointMassB.getDirection(pointMassA);
        const repulsionForce = distance > 0
            ? direction.scale(10 / Math.sqrt(distance))
            : new Vector(0, 0);
        return repulsionForce;
    }
    static embedder(graph) {
        const instance = EadesEmbedder.getInstance();
        if (0 === instance._vertexMap.size) {
            graph.vertices.forEach((vertex) => {
                const pointMass = new PointMass(Math.random() * Canvas.width / 2 + Canvas.width / 4, Math.random() * Canvas.height / 2 + Canvas.height / 4);
                instance._vertexMap.set(vertex, pointMass);
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
                throw new Error(`PointMass for vertex ${vertexA} is undefined.`);
            }
            let force = pointMassA.force;
            force = force.add(instance.calculateCenterForce(vertexA));
            graph.getAdjacentVertices(vertexA).forEach((vertexB) => {
                if (vertexA === vertexB) {
                    return;
                }
                force = force.add(instance.calculateSpringForce(vertexA, vertexB));
            });
            graph.getNonAdjacentVertices(vertexA).forEach((vertexB) => {
                if (vertexA === vertexB) {
                    return;
                }
                force = force.add(instance.calculateRepulsionForce(vertexA, vertexB));
            });
            pointMassA.force = force.scale(0.99);
            pointMassA.applyForce();
        });
        instance._edgeMap.forEach((edge, line) => {
            const pointMassA = instance._vertexMap.get(edge[0]);
            if (!pointMassA) {
                throw new Error(`PointMass for vertex ${edge[0]} is undefined.`);
            }
            const pointMassB = instance._vertexMap.get(edge[1]);
            if (!pointMassB) {
                throw new Error(`PointMass for vertex ${edge[1]} is undefined.`);
            }
            line.pointA = pointMassA.position;
            line.pointB = pointMassB.position;
        });
    }
}
