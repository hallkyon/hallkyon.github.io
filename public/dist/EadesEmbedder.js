// @prettier
import Canvas from './Canvas.js';
import DrawingLine from './DrawingLine.js';
import DrawingPoint from './DrawingPoint.js';
import Point from './Point.js';
import PointMass from './PointMass.js';
import Vector from './Vector.js';
import DrawingCircle from './DrawingCircle.js';
import Boundary from './Boundary.js';
class EadesEmbedder {
    constructor(graph) {
        this._boundary = new Boundary(Canvas.width / 2, Canvas.height / 2, new DrawingCircle());
        this._c1 = 10;
        this._c2 = 50;
        this._c3 = 2;
        this._vertexMap = new Map();
        this._edgeMap = new Map();
        graph.vertices.forEach((vertex) => {
            const pointMass = new PointMass(Canvas.width / 2, Canvas.height / 2, new DrawingPoint());
            this._vertexMap.set(vertex, pointMass);
        });
        graph.edges.forEach((edge) => {
            const line = new DrawingLine(new Point(0, 0), new Point(0, 0));
            this._edgeMap.set(line, edge);
        });
    }
    static getInstance(graph) {
        if (!EadesEmbedder.instance) {
            EadesEmbedder.instance = new EadesEmbedder(graph);
        }
        return EadesEmbedder.instance;
    }
    getPointMass(vertex) {
        const pointMass = this._vertexMap.get(vertex);
        if (!pointMass) {
            throw new Error(`PointMass for vertex ${vertex} is undefined.`);
        }
        return pointMass;
    }
    calculateSpringForce(vertexA, vertexB) {
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
        const springForce = distance > 0
            ? direction.scale(this._c1 * Math.log(distance / this._c2))
            : new Vector(Math.random(), Math.random());
        return springForce;
    }
    calculateRepulsionForce(vertexA, vertexB) {
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
        const repulsionForce = distance > 0
            ? direction.scale(this._c3 / Math.sqrt(distance))
            : new Vector(Math.random(), Math.random());
        return repulsionForce;
    }
    embed(graph) {
        let forceStrengthOnBoundary = 0;
        graph.vertices.forEach((vertexA) => {
            const pointMassA = this.getPointMass(vertexA);
            let force = pointMassA.force;
            graph.getAdjacentVertices(vertexA).forEach((vertexB) => {
                force = force.add(this.calculateSpringForce(vertexA, vertexB));
            });
            graph.getNonAdjacentVertices(vertexA).forEach((vertexB) => {
                force = force.add(this.calculateRepulsionForce(vertexA, vertexB));
            });
            pointMassA.force = force.scale(EadesEmbedder._c4);
            // 1, Move pointMass to edge of boundary (if possible)
            const dx = pointMassA.position.x - this._boundary.center.x;
            const dy = pointMassA.position.y - this._boundary.center.y;
            const a = Math.pow(pointMassA.force.x, 2) + Math.pow(pointMassA.force.y, 2);
            const b = 2 * (dx * pointMassA.force.x + dy * pointMassA.force.y);
            const c = Math.pow(dx, 2) + Math.pow(dy, 2) - Math.pow(this._boundary.radius, 2);
            const discriminant = b * b - 4 * a * c;
            const t = Math.max(0, Math.min(1, (-b + Math.sqrt(discriminant)) / (2 * a)));
            // 4. move all pointMasses outside of boundary back to boundary
            if (Math.pow(dx, 2) + Math.pow(dy, 2) > Math.pow(this._boundary.radius, 2)) {
                pointMassA.position = new Point(Canvas.width / 2 + 1, Canvas.height / 2 + 1);
            }
            else {
                const newPosition = new Point(pointMassA.position.x + t * pointMassA.force.x, pointMassA.position.y + t * pointMassA.force.y);
                pointMassA.position = newPosition;
            }
            // 2. Calculate force on boundary
            const forceStrengthByPointMass = new Vector(pointMassA.position.x - this._boundary.center.x, pointMassA.position.y - this._boundary.center.y).projection(pointMassA.force).magnitude;
            forceStrengthOnBoundary += forceStrengthByPointMass;
        });
        // 3. Expand boundary
        this._boundary.radius =
            this._boundary.radius + forceStrengthOnBoundary - 1;
        this._edgeMap.forEach((edge, line) => {
            const pointMassA = this.getPointMass(edge[0]);
            line.pointA = pointMassA.position;
            const pointMassB = this.getPointMass(edge[1]);
            line.pointB = pointMassB.position;
        });
    }
    static embedder(graph) {
        const instance = EadesEmbedder.getInstance(graph);
        instance.embed(graph);
    }
}
EadesEmbedder._c4 = 0.5;
export default EadesEmbedder;
