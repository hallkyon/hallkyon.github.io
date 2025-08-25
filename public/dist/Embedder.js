import Matrix from './Matrix.js';
import Vector from './Vector.js';
class Embedder {
    static calculateAttractionScalar(idealDistance, actualDistance) {
        return (actualDistance * actualDistance) / idealDistance;
    }
    static calculateRepulsionScalar(idealDistance, actualDistance) {
        if (actualDistance > Embedder._negiligibleDistance) {
            return 0;
        }
        return -(idealDistance * idealDistance) / actualDistance;
    }
    static calculateForce(rectA, rectB, scalarFunction) {
        if (rectA === rectB) {
            return new Vector(0, 0);
        }
        try {
            const transformationMatrix = new Matrix(2, 2);
            transformationMatrix.setValue(0, 0, (rectA.width + rectB.width) / 2);
            transformationMatrix.setValue(1, 1, (rectA.height + rectB.height) / 2);
            const direction = rectA.position
                .getDirectedVector(rectB.position)
                .toUnitVector();
            const actualDistance = rectA.position.getDistance(rectB.position);
            const idealDistance = direction
                .matrixMultiply(transformationMatrix)
                .scale(Embedder._edgeScalar).magnitude;
            return direction.scale(scalarFunction(idealDistance, actualDistance));
        }
        catch (_a) {
            return new Vector(Math.random(), Math.random());
        }
    }
    static embed(graph) {
        graph.vertices.forEach((rectA) => {
            let force = new Vector(0, 0);
            graph.getAdjacentVertices(rectA).forEach((rectB) => {
                force = force.add(this.calculateForce(rectA, rectB, Embedder.calculateAttractionScalar));
                force = force.add(this.calculateForce(rectA, rectB, Embedder.calculateRepulsionScalar));
            });
            graph.getNonAdjacentVertices(rectA).forEach((rectB) => {
                force = force.add(this.calculateForce(rectA, rectB, Embedder.calculateRepulsionScalar));
            });
            force.scale(Embedder._coolingFactor);
            rectA.x += force.x;
            rectA.y += force.y;
        });
        return graph;
    }
}
Embedder._edgeScalar = 1.2;
Embedder._coolingFactor = 0.01;
Embedder._negiligibleDistance = 300;
export default Embedder;
//# sourceMappingURL=Embedder.js.map