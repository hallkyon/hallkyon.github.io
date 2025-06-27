import Canvas from './Canvas.js';
import DrawingRect from './DrawingRect.js';
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
    static calculateForce(rectA, rectB, scalarFunction) {
        if (rectA === rectB) {
            return new Vector(0, 0);
        }
        try {
            const distance = rectA.position.getDistance(rectB.position);
            const direction = rectA.position.getDirection(rectB.position);
            return direction.scale(scalarFunction(distance));
        }
        catch (_a) {
            return new Vector(Math.random(), Math.random());
        }
    }
    static embed(graph) {
        var _a;
        (_a = EadesEmbedder._center) !== null && _a !== void 0 ? _a : (EadesEmbedder._center = new DrawingRect(Canvas.center.x, Canvas.center.y));
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
EadesEmbedder._c2 = 100; // distance between two vertices
EadesEmbedder._c3 = 4;
EadesEmbedder._c4 = 0.5; // repulsion constant
export default EadesEmbedder;
//# sourceMappingURL=EadesEmbedder.js.map