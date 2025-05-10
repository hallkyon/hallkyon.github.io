<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d7f883a (work in progress)
import Canvas from './Canvas.js';
import Vector from './Vector.js';
class EadesEmbedder {
    static calculateCenterScalar(distance) {
        return EadesEmbedder._c0 * Math.sqrt(distance);
    }
    static calculateSpringScalar(distance) {
        return EadesEmbedder._c1 * Math.log(distance / EadesEmbedder._c2);
    }
    static calculateRepulsionScalar(distance) {
        return -EadesEmbedder._c3 / Math.sqrt(distance);
    }
    static calculateForce(pointA, pointB, scalarFunction) {
        if (pointA === pointB) {
            return new Vector(0, 0);
        }
        try {
            const distance = pointA.getDistance(pointB);
            const direction = pointA.getDirection(pointB);
<<<<<<< HEAD
=======
// @prettier
import Canvas from './Canvas.js';
import Controller from './Controller.js';
import DrawingLine from './DrawingLine.js';
import DrawingCircle from './DrawingCircle.js';
import Point from './Point.js';
import PointMass from './PointMass.js';
import UserInterface from './UserInterface.js';
import Vector from './Vector.js';
class EadesEmbedder {
    getFilename(vertex) {
        const note = vertex.reference;
        if (!note) {
            throw new Error(`Vertex reference is undefined.`);
        }
        return note.filename;
    }
    constructor(graph) {
        this._vertexMap = new Map();
        this._edgeMap = new Map();
        this._pointMassDrawingMap = new Map();
        this._c0 = 0.2; // center attraction constant
        this._c1 = 10;
        this._c2 = 50;
        this._c3 = 2;
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
            pointMassDrawing.radius = 10;
            pointMassDrawing.show();
            pointMassDrawing.setCallback((filename) => {
                const notePromise = Controller.getNote(filename);
                notePromise.then((note) => {
                    UserInterface.setNote(note);
                });
                return notePromise;
            }, this.getFilename(vertex));
            this._vertexMap.set(vertex, pointMass);
            this._pointMassDrawingMap.set(pointMass, pointMassDrawing);
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
            throw new Error(`PointMass for vertex is undefined.`);
        }
        return pointMass;
    }
    getDrawing(pointMass) {
        const drawing = this._pointMassDrawingMap.get(pointMass);
        if (!drawing) {
            throw new Error(`Drawing for point mass is undefined.`);
        }
        return drawing;
    }
    calculateSpringScalar(distance) {
        return this._c1 * Math.log(distance / this._c2);
    }
    calculateRepulsionScalar(distance) {
        return -this._c3 / Math.sqrt(distance);
    }
    calculateCenterScalar(distance) {
        return this._c0 * Math.sqrt(distance);
    }
    calculateForce(pointMassA, pointMassB, scalarFunction) {
        if (pointMassA === pointMassB) {
            return new Vector(0, 0);
        }
        try {
            const distance = pointMassA.getDistance(pointMassB);
            const direction = pointMassA.getDirection(pointMassB);
>>>>>>> 0b30a78 (work in progress)
=======
>>>>>>> d7f883a (work in progress)
            return direction.scale(scalarFunction(distance));
        }
        catch (_a) {
            return new Vector(Math.random(), Math.random());
        }
    }
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d7f883a (work in progress)
    static embed(graph) {
        var _a;
        (_a = EadesEmbedder._center) !== null && _a !== void 0 ? _a : (EadesEmbedder._center = Canvas.center);
        graph.vertices.forEach((pointA) => {
            let force = new Vector(0, 0);
            force = force.add(this.calculateForce(pointA, EadesEmbedder._center, EadesEmbedder.calculateCenterScalar));
            graph.getAdjacentVertices(pointA).forEach((pointB) => {
                force = force.add(this.calculateForce(pointA, pointB, EadesEmbedder.calculateSpringScalar));
            });
            graph.getNonAdjacentVertices(pointA).forEach((pointB) => {
                force = force.add(this.calculateForce(pointA, pointB, EadesEmbedder.calculateRepulsionScalar));
            });
            force.scale(EadesEmbedder._c4);
            pointA.x += force.x;
            pointA.y += force.y;
        });
        return graph;
    }
}
EadesEmbedder._c0 = 0.2; // center attraction constant
EadesEmbedder._c1 = 10;
<<<<<<< HEAD
EadesEmbedder._c2 = 100; // distance between two vertices
EadesEmbedder._c3 = 4;
EadesEmbedder._c4 = 0.5; // repulsion constant
=======
    embed(graph) {
        let boundaryRadius = 0;
        graph.vertices.forEach((vertexA) => {
            const pointMassA = this.getPointMass(vertexA);
            let force = pointMassA.force;
            force = force.add(this.calculateForce(pointMassA, this._center, this.calculateCenterScalar.bind(this)));
            graph.getAdjacentVertices(vertexA).forEach((vertexB) => {
                const pointMassB = this.getPointMass(vertexB);
                force = force.add(this.calculateForce(pointMassA, pointMassB, this.calculateSpringScalar.bind(this)));
            });
            graph.getNonAdjacentVertices(vertexA).forEach((vertexB) => {
                const pointMassB = this.getPointMass(vertexB);
                force = force.add(this.calculateForce(pointMassA, pointMassB, this.calculateRepulsionScalar.bind(this)));
            });
            pointMassA.force = force.scale(EadesEmbedder._c4);
            pointMassA.x = pointMassA.x + pointMassA.force.x;
            pointMassA.y = pointMassA.y + pointMassA.force.y;
            const pointMassDrawing = this.getDrawing(pointMassA);
            pointMassDrawing.x = pointMassA.x;
            pointMassDrawing.y = pointMassA.y;
            boundaryRadius = Math.max(boundaryRadius, pointMassA.getDistance(this._center));
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
    static embedder(graph) {
        const instance = EadesEmbedder.getInstance(graph);
        instance.embed(graph);
    }
}
EadesEmbedder._c4 = 0.5;
>>>>>>> 0b30a78 (work in progress)
=======
EadesEmbedder._c2 = 50;
EadesEmbedder._c3 = 2;
EadesEmbedder._c4 = 0.5; // repulsion constant
>>>>>>> d7f883a (work in progress)
export default EadesEmbedder;
//# sourceMappingURL=EadesEmbedder.js.map