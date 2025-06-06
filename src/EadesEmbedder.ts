import Canvas from './Canvas.js';
import Graph from './Graph.js';
import Point from './Point.js';
import Vector from './Vector.js';

export default class EadesEmbedder {
    private static readonly _c0 = 0.2; // center attraction constant
    private static readonly _c1 = 10;
    private static readonly _c2 = 50;
    private static readonly _c3 = 2;
    private static readonly _c4 = 0.5; // repulsion constant

    private static _center: Point;

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
        pointA: Point,
        pointB: Point,
        scalarFunction: (distance: number) => number
    ): Vector {
        if (pointA === pointB) {
            return new Vector(0, 0);
        }
        try {
            const distance = pointA.getDistance(pointB);
            const direction = pointA.getDirection(pointB);
            return direction.scale(scalarFunction(distance));
        } catch {
            return new Vector(Math.random(), Math.random());
        }
    }

    public static embed(graph: Graph<Point>): Graph<Point> {
        if (EadesEmbedder._center === undefined) {
            EadesEmbedder._center = Canvas.center;
        }

        graph.vertices.forEach((pointA) => {
            let force = new Vector(0, 0);
            force = force.add(
                this.calculateForce(
                    pointA,
                    EadesEmbedder._center,
                    EadesEmbedder.calculateCenterScalar
                )
            );
            graph.getAdjacentVertices(pointA).forEach((pointB) => {
                force = force.add(
                    this.calculateForce(
                        pointA,
                        pointB,
                        EadesEmbedder.calculateSpringScalar
                    )
                );
            });
            graph.getNonAdjacentVertices(pointA).forEach((pointB) => {
                force = force.add(
                    this.calculateForce(
                        pointA,
                        pointB,
                        EadesEmbedder.calculateRepulsionScalar
                    )
                );
            });
            force.scale(EadesEmbedder._c4);

            pointA.x += force.x;
            pointA.y += force.y;
        });

        return graph;
    }
}
