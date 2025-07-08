import Canvas from './Canvas.js';
import DrawingRect from './DrawingRect.js';
import Graph from './Graph.js';
import Matrix from './Matrix.js';
import Vector from './Vector.js';

export default class EadesEmbedder {
    private static readonly _c0 = 0.2; // center attraction constant
    private static readonly _c1 = 10;
    private static readonly _c2 = 2;
    private static readonly _c3 = 6;
    private static readonly _c4 = 0.9;

    private static _center: DrawingRect;

    private static calculateCenterScalar(rectA: DrawingRect, center: DrawingRect): number {
        const distance = rectA.position.getDistance(center.position);
        return EadesEmbedder._c0 * Math.sqrt(distance);
    }

    private static calculateSpringScalar(rectA: DrawingRect, rectB: DrawingRect): number {
        const matrix = new Matrix(2,2);
        matrix.setValue(0, 0, EadesEmbedder._c2 * (rectA.width + rectB.width) / 2);
        matrix.setValue(1, 1, EadesEmbedder._c2 * (rectA.height + rectB.height) / 2);
        const distance = rectA.position.getDistance(rectB.position);
        const direction = rectA.position.getDirectedVector(rectB.position).toUnitVector();
        const idealEdgeLength = direction.matrixMultiply(matrix).magnitude;
        return EadesEmbedder._c1 * Math.log(distance / idealEdgeLength);
    }

    private static calculateRepulsionScalar(rectA: DrawingRect, rectB: DrawingRect): number {
        const distance = rectA.position.getDistance(rectB.position);
        return -EadesEmbedder._c3 / Math.sqrt(distance);
    }

    private static calculateForce(
        rectA: DrawingRect,
        rectB: DrawingRect,
        scalarFunction: (rectA: DrawingRect, rectB: DrawingRect) => number
    ): Vector {
        if (rectA === rectB) {
            return new Vector(0, 0);
        }
        try {
            const directionUnitVector = rectA.position
                .getDirectedVector(rectB.position)
                .toUnitVector();
            return directionUnitVector.scale(scalarFunction(rectA, rectB));
        } catch {
            return new Vector(Math.random(), Math.random());
        }
    }

    public static embed(graph: Graph<DrawingRect>): Graph<DrawingRect> {
        EadesEmbedder._center ??= new DrawingRect(
            Canvas.center.x,
            Canvas.center.y
        );

        graph.vertices.forEach((rectA) => {
            let force = new Vector(0, 0);
            force = force.add(
                this.calculateForce(
                    rectA,
                    EadesEmbedder._center,
                    EadesEmbedder.calculateCenterScalar
                )
            );
            graph.getAdjacentVertices(rectA).forEach((rectB) => {
                force = force.add(
                    this.calculateForce(
                        rectA,
                        rectB,
                        EadesEmbedder.calculateSpringScalar
                    )
                );
            });
            graph.getNonAdjacentVertices(rectA).forEach((rectB) => {
                force = force.add(
                    this.calculateForce(
                        rectA,
                        rectB,
                        EadesEmbedder.calculateRepulsionScalar
                    )
                );
            });
            force.scale(EadesEmbedder._c4);

            rectA.x += force.x;
            rectA.y += force.y;
        });

        return graph;
    }
}
