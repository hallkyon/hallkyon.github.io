import DrawingVertex from './DrawingVertex';
import Graph from './Graph';
import Matrix from './Matrix';
import Vector from './Vector';

export default class Embedder {
    private static readonly _edgeScalar = 1.2;
    private static readonly _coolingFactor = 0.01;
    private static readonly _negiligibleDistance = 300;

    private static calculateAttractionScalar(
        idealDistance: number,
        actualDistance: number
    ): number {
        return (actualDistance * actualDistance) / idealDistance;
    }

    private static calculateRepulsionScalar(
        idealDistance: number,
        actualDistance: number
    ): number {
        if (actualDistance > Embedder._negiligibleDistance) {
            return 0;
        }
        return -(idealDistance * idealDistance) / actualDistance;
    }

    private static calculateForce(
        rectA: DrawingVertex,
        rectB: DrawingVertex,
        scalarFunction: (
            idealDistance: number,
            actualDistance: number
        ) => number
    ): Vector {
        if (rectA === rectB) {
            return new Vector(0, 0);
        }

        try {
            const transformationMatrix = new Matrix(2, 2);
            transformationMatrix.setValue(
                0,
                0,
                (rectA.width + rectB.width) / 2
            );
            transformationMatrix.setValue(
                1,
                1,
                (rectA.height + rectB.height) / 2
            );

            const direction = rectA.position
                .getDirectedVector(rectB.position)
                .toUnitVector();
            const actualDistance = rectA.position.getDistance(rectB.position);
            const idealDistance = direction
                .matrixMultiply(transformationMatrix)
                .scale(Embedder._edgeScalar).magnitude;
            return direction.scale(
                scalarFunction(idealDistance, actualDistance)
            );
        } catch {
            return new Vector(Math.random(), Math.random());
        }
    }

    public static embed(graph: Graph<DrawingVertex>): Graph<DrawingVertex> {
        graph.vertices.forEach((rectA) => {
            let force = new Vector(0, 0);
            graph.getAdjacentVertices(rectA).forEach((rectB) => {
                force = force.add(
                    this.calculateForce(
                        rectA,
                        rectB,
                        Embedder.calculateAttractionScalar
                    )
                );
                force = force.add(
                    this.calculateForce(
                        rectA,
                        rectB,
                        Embedder.calculateRepulsionScalar
                    )
                );
            });
            graph.getNonAdjacentVertices(rectA).forEach((rectB) => {
                force = force.add(
                    this.calculateForce(
                        rectA,
                        rectB,
                        Embedder.calculateRepulsionScalar
                    )
                );
            });
            force.scale(Embedder._coolingFactor);

            rectA.x += force.x;
            rectA.y += force.y;
        });

        return graph;
    }
}
