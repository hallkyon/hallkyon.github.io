import Canvas from './Canvas.js';
import DrawingRect from './DrawingRect.js';
import Graph from './Graph.js';
import Point from './Point.js';
import Vector from './Vector.js';

export default class EadesEmbedder {
    private static readonly _c0 = 0.2; // center attraction constant
    private static readonly _c1 = 10;
    private static readonly _c2 = 100;  // distance between two vertices
    private static readonly _c3 = 4;
    private static readonly _c4 = 0.5; // repulsion constant

    private static _center: DrawingRect;

    private static calculateCenterScalar(distance: number): number {
        return EadesEmbedder._c0 * Math.sqrt(distance);
    }

    private static calculateSpringScalar(distance: number): number {
        return EadesEmbedder._c1 * Math.log(distance / EadesEmbedder._c2);
    }

    private static calculateRepulsionScalar(distance: number): number {
        return -EadesEmbedder._c3 / Math.sqrt(distance);
    }

    private static calculateForce(
        rectA: DrawingRect,
        rectB: DrawingRect,
        scalarFunction: (distance: number) => number
    ): Vector {
        if (rectA === rectB) {
            return new Vector(0, 0);
        }
        try {
            const distance = rectA.position.getDistance(rectB.position);
            const direction = rectA.position.getDirection(rectB.position);
            return direction.scale(scalarFunction(distance));
        } catch {
            return new Vector(Math.random(), Math.random());
        }
    }

    public static embed(graph: Graph<DrawingRect>): Graph<DrawingRect> {
        EadesEmbedder._center ??= new DrawingRect(Canvas.center.x, Canvas.center.y);

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
