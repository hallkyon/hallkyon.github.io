// @prettier
import Canvas from './Canvas.js';
import DrawingLine from './DrawingLine.js';
import DrawingPoint from './DrawingPoint.js';
import Point from './Point.js';
import PointMass from './PointMass.js';
import Vector from './Vector.js';
class EadesEmbedder {
    constructor() {
        this._c1 = 1;
        this._c2 = 50;
        this._c3 = 2;
        this._vertexMap = new Map();
        this._edgeMap = new Map();
        this._center = new Point(Canvas.width / 2, Canvas.height / 2);
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
        const direction = pointMass.getDirection(this._center);
        const centerForce = direction;
        return centerForce;
    }
    calculateSpringForce(vertexA, vertexB) {
        const instance = EadesEmbedder.getInstance();
        const pointMassA = instance._vertexMap.get(vertexA);
        const pointMassB = instance._vertexMap.get(vertexB);
        if (!pointMassA || !pointMassB) {
            throw new Error('PointMass for one or both vertices is undefined.');
        }
        const distance = pointMassA.getDistance(pointMassB.position);
        const direction = pointMassA.getDirection(pointMassB.position);
        const springForce = direction.scale(this._c1 * Math.log(distance / this._c2));
        return springForce;
    }
    calculateRepulsionForce(vertexA, vertexB) {
        const instance = EadesEmbedder.getInstance();
        const pointMassA = instance._vertexMap.get(vertexA);
        const pointMassB = instance._vertexMap.get(vertexB);
        if (!pointMassA || !pointMassB) {
            throw new Error('PointMass for one or both vertices is undefined.');
        }
        const distance = pointMassB.getDistance(pointMassA.position);
        const direction = pointMassB.getDirection(pointMassA.position);
        const repulsionForce = distance > 0
            ? direction.scale(this._c3 / Math.sqrt(distance))
            : new Vector(0, 0);
        return repulsionForce;
    }
    static embedder(graph) {
        const instance = EadesEmbedder.getInstance();
        if (0 === instance._vertexMap.size) {
            graph.vertices.forEach((vertex) => {
                const pointMass = new PointMass((Math.random() * Canvas.width) / 2 + Canvas.width / 4, (Math.random() * Canvas.height) / 2 + Canvas.height / 4, new DrawingPoint());
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
            pointMassA.force = force.scale(EadesEmbedder._c4);
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
EadesEmbedder._c4 = 0.5;
export default EadesEmbedder;
