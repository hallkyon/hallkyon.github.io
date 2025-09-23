import type DrawingVertex from './DrawingVertex';
import type Graph from './Graph';
import type Point from './Point';
import Canvas from './Canvas';
import Matrix from './Matrix';
import Vector from './Vector';

export default class Embedder {
    private static readonly _edgeScalar = 2;
    private static readonly _coolingFactor = 0.01;

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
        return -(idealDistance * idealDistance) / actualDistance;
    }

    private static calculateCenterForce(
        vertex: DrawingVertex,
        center: Point
    ): Vector {
        const centerForceFactor = 0.7;
        return vertex.position
            .getDirectedVector(center)
            .toUnitVector()
            .scale(centerForceFactor);
    }

    private static calculateForce(
        vertexA: DrawingVertex,
        vertexB: DrawingVertex,
        scalarFunction: (
            idealDistance: number,
            actualDistance: number
        ) => number
    ): Vector {
        if (vertexA === vertexB) {
            return new Vector(0, 0);
        }

        try {
            const transformationMatrix = new Matrix(2, 2);
            transformationMatrix.setValue(
                0,
                0,
                (vertexA.width + vertexB.width) / 2
            );
            transformationMatrix.setValue(
                1,
                1,
                (vertexA.height + vertexB.height) / 2
            );

            const direction = vertexA.position
                .getDirectedVector(vertexB.position)
                .toUnitVector();
            const actualDistance = vertexA.position.getDistance(
                vertexB.position
            );
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
        graph.vertices.forEach((vertexA) => {
            let force = new Vector(0, 0);
            force.add(
                this.calculateCenterForce(vertexA, Canvas.getInstance().center)
            );
            graph.getAdjacentVertices(vertexA).forEach((vertexB) => {
                force.add(
                    this.calculateForce(
                        vertexA,
                        vertexB,
                        Embedder.calculateAttractionScalar
                    )
                );
                force.add(
                    this.calculateForce(
                        vertexA,
                        vertexB,
                        Embedder.calculateRepulsionScalar
                    )
                );
            });
            graph.getNonAdjacentVertices(vertexA).forEach((vertexB) => {
                force.add(
                    this.calculateForce(
                        vertexA,
                        vertexB,
                        Embedder.calculateRepulsionScalar
                    )
                );
            });
            force.scale(Embedder._coolingFactor);

            vertexA.x += force.x;
            vertexA.y += force.y;
        });

        return graph;
    }
}
