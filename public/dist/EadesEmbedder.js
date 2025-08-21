import Canvas from './Canvas.js';
import DrawingRect from './DrawingRect.js';
import Matrix from './Matrix.js';
import Vector from './Vector.js';
class EadesEmbedder {
    static calculateCenterScalar(rectA, center) {
        const distance = rectA.position.getDistance(center.position);
        return EadesEmbedder._c0 * Math.sqrt(distance);
    }
    static calculateSpringScalar(rectA, rectB) {
        const matrix = new Matrix(2, 2);
        matrix.setValue(0, 0, EadesEmbedder._c2 * (rectA.width + rectB.width) / 2);
        matrix.setValue(1, 1, EadesEmbedder._c2 * (rectA.height + rectB.height) / 2);
        const distance = rectA.position.getDistance(rectB.position);
        const direction = rectA.position.getDirectedVector(rectB.position).toUnitVector();
        const idealEdgeLength = direction.matrixMultiply(matrix).magnitude;
        return EadesEmbedder._c1 * Math.log(distance / idealEdgeLength);
    }
    static calculateRepulsionScalar(rectA, rectB) {
        const distance = rectA.position.getDistance(rectB.position);
        return -EadesEmbedder._c3 / Math.sqrt(distance);
    }
    static calculateForce(rectA, rectB, scalarFunction) {
        if (rectA === rectB) {
            return new Vector(0, 0);
        }
        try {
            const directionUnitVector = rectA.position
                .getDirectedVector(rectB.position)
                .toUnitVector();
            return directionUnitVector.scale(scalarFunction(rectA, rectB));
        }
        catch (_a) {
            return new Vector(Math.random(), Math.random());
        }
    }
    static embed(graph) {
        var _a;
        (_a = EadesEmbedder._center) !== null && _a !== void 0 ? _a : (EadesEmbedder._center = new DrawingRect(Canvas.center.x, Canvas.center.y, ''));
        graph.vertices.forEach((rectA) => {
            let force = new Vector(0, 0);
            force = force.add(this.calculateForce(rectA, EadesEmbedder._center, EadesEmbedder.calculateCenterScalar));
            graph.getAdjacentVertices(rectA).forEach((rectB) => {
                force = force.add(this.calculateForce(rectA, rectB, EadesEmbedder.calculateSpringScalar));
            });
            graph.getNonAdjacentVertices(rectA).forEach((rectB) => {
                force = force.add(this.calculateForce(rectA, rectB, EadesEmbedder.calculateRepulsionScalar));
            });
            force.scale(EadesEmbedder._c4);
            rectA.x += force.x;
            rectA.y += force.y;
        });
        return graph;
    }
}
EadesEmbedder._c0 = 0.2; // center attraction constant
EadesEmbedder._c1 = 10;
EadesEmbedder._c2 = 2;
EadesEmbedder._c3 = 6;
EadesEmbedder._c4 = 0.9;
export default EadesEmbedder;
//# sourceMappingURL=EadesEmbedder.js.map