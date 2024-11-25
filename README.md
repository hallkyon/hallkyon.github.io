# GraphNote

Notes visualized as a graph.

## Code Formater

I use Prettier to format my HTML, CSS and Javascript code.

## Ray Casting Algorithm

The **Ray Casting Algorithm** is a technique commonly used in computational geometry, particularly for determining whether a point is inside a polygon. It's widely applied in computer graphics, geographic information systems (GIS), and game development.

### Basic Idea:

The Ray Casting Algorithm works by "casting" a ray (a straight line) from the point in question and counting how many times it intersects the edges of the polygon. The key idea is that:

-   If the ray intersects the polygon an **odd** number of times, the point is **inside** the polygon.
-   If the ray intersects the polygon an **even** number of times, the point is **outside** the polygon.

### Steps in the Ray Casting Algorithm:

1. **Choose a ray**:
   Start from the point \( P \) that you want to test and cast a ray in any direction (usually, a horizontal ray to the right is chosen, i.e., along the positive x-axis). This ray should extend infinitely in the chosen direction.

2. **Intersection Test**:
   For each edge of the polygon, check whether the ray intersects the edge. An edge is defined by two consecutive vertices \( A \) and \( B \).

3. **Conditions for intersection**:
   To determine if the ray intersects an edge, you check if:

    - The point \( P \) lies between the y-coordinates of the edge (i.e., if the ray crosses the vertical span of the edge).
    - The ray intersects the line segment between the vertices of the polygon in the x-direction.

    Specifically:

    - The edge is checked to see if the y-coordinate of the point \( P \) is between the y-coordinates of the endpoints \( A \) and \( B \).
    - The x-coordinate where the ray would intersect the edge is calculated using linear interpolation. If this intersection point lies to the right of the point \( P \), then count it as an intersection.

4. **Count Intersections**:
   Keep a counter to track how many intersections the ray makes with the edges of the polygon.

5. **Odd/Even Rule**:
    - If the number of intersections is **odd**, the point is **inside** the polygon.
    - If the number of intersections is **even**, the point is **outside** the polygon.

### Special Cases:

-   **Edge crosses the ray exactly**: If a polygon's edge intersects the ray exactly at the point being tested, there are two common approaches:

    -   Treat the intersection as an odd or even count depending on which side of the edge the point lies.
    -   Use a small tolerance to avoid counting numerical edge cases where the ray passes exactly through a vertex.

-   **Vertical edges or horizontal edges**: Handling vertical or horizontal edges can be tricky. A vertical edge does not have a simple x-range to check for intersection, so some algorithms treat vertical edges as special cases to ensure accuracy.

### Example:

Consider a polygon with vertices:
\[
(2, 1), (5, 1), (5, 4), (2, 4)
\]
and you want to determine if the point \( P = (3, 2) \) is inside or outside the polygon.

1. Cast a horizontal ray to the right from \( P = (3, 2) \), which will move along the x-axis (say, the line \( y = 2 \)).

2. Check for intersections with each edge:

    - The edge from \( (2, 1) \) to \( (5, 1) \): The y-coordinates are outside the range of the ray's y-coordinate (since \( P \) has \( y = 2 \), and this edge is at \( y = 1 \)), so no intersection.
    - The edge from \( (5, 1) \) to \( (5, 4) \): This vertical edge crosses the ray at \( x = 5 \), which is to the right of \( P = (3, 2) \), so it intersects once.
    - The edge from \( (5, 4) \) to \( (2, 4) \): This is a horizontal edge, and since the ray does not cross this edge, no intersection occurs.
    - The edge from \( (2, 4) \) to \( (2, 1) \): This vertical edge does not intersect the ray, so no intersection.

3. Count the intersections: There is **one intersection**.

4. Since the number of intersections is **odd**, the point \( P = (3, 2) \) is **inside** the polygon.

### Applications:

-   **Point-in-Polygon Tests**: Used in GIS for spatial analysis (e.g., determining if a point lies within a geographic region).
-   **Collision Detection in Games**: Used to check if a point or object intersects a polygonal boundary.
-   **Rendering and Ray Tracing**: Sometimes used in 3D graphics, where rays are cast to test for intersections with 3D objects.

### Optimization:

For complex or large polygons, various optimizations may be used, such as:

-   **Bounding Box Checks**: Before testing each edge, check if the ray is within the bounding box of the edge to reduce unnecessary calculations.
-   **Precomputing Intersection Points**: In some cases, the intersections can be precomputed to speed up the process.

A **bounding box** is a simple rectangular region that completely contains a given object, such as a polygon, or in this case, an **edge** of a polygon. In computational geometry, bounding boxes are often used as a quick way to filter out regions of space where certain tests, like intersections, are unlikely to occur. This can help improve performance by reducing the number of detailed computations needed.

### Bounding Box of an Edge:

For a given edge of a polygon, the **bounding box** is the smallest axis-aligned rectangle that contains both endpoints of the edge. It's defined by the minimum and maximum x and y coordinates of the two endpoints.

Let’s break it down with a simple example:

### Example:

Imagine you have an edge defined by two endpoints: \( A(x_1, y_1) \) and \( B(x_2, y_2) \).

-   The **bounding box** of this edge is the rectangle that stretches from:
    -   The smallest x-coordinate between \( x_1 \) and \( x_2 \) (i.e., \( \min(x_1, x_2) \)).
    -   The largest x-coordinate between \( x_1 \) and \( x_2 \) (i.e., \( \max(x_1, x_2) \)).
    -   The smallest y-coordinate between \( y_1 \) and \( y_2 \) (i.e., \( \min(y_1, y_2) \)).
    -   The largest y-coordinate between \( y_1 \) and \( y_2 \) (i.e., \( \max(y_1, y_2) \)).

Thus, the bounding box is represented by the coordinates:
\[
\text{Bounding Box} = \left[ \min(x_1, x_2), \max(x_1, x_2), \min(y_1, y_2), \max(y_1, y_2) \right]
\]

### Why Use a Bounding Box for Edge Intersections?

The bounding box is useful because, when performing tasks like **ray casting** (as in the point-in-polygon test), you can first check if the ray intersects the bounding box of an edge before performing more complex intersection tests. If the ray doesn't intersect the bounding box, you can **skip** checking the edge entirely because the ray couldn't possibly intersect that edge.

#### Steps Involving Bounding Boxes:

1. **Check if Ray Intersects Bounding Box**: Before checking if the ray intersects an edge, you first check if the ray intersects the edge’s bounding box. If the ray does not intersect the bounding box, the edge itself cannot be intersected, so you skip further checks for that edge.

2. **Bounding Box Quick Filter**: In the context of ray-casting algorithms, if the ray is outside the bounding box of an edge, you can safely ignore that edge. This can significantly improve the algorithm's performance because it reduces the number of intersection checks with edges that the ray cannot possibly hit.

3. **Efficient Intersection Calculations**: If a ray does intersect the bounding box of an edge, then you proceed with the more detailed intersection calculations, such as checking if the ray actually crosses the line segment defined by the edge.

### Example:

Let’s say you have an edge defined by two points:

-   \( A(2, 1) \)
-   \( B(5, 4) \)

The bounding box for this edge would be:

-   \( \text{Bounding Box} = [\min(2, 5), \max(2, 5), \min(1, 4), \max(1, 4)] \)
-   Which simplifies to: \( [2, 5, 1, 4] \)

This means the bounding box is the rectangle with:

-   Lower-left corner at \( (2, 1) \)
-   Upper-right corner at \( (5, 4) \)

If you’re casting a ray from a point, say \( P(3, 2) \), and the ray is directed along the positive x-axis (i.e., along the line \( y = 2 \)), the ray would potentially intersect this bounding box. You would then proceed to check if the ray actually intersects the edge \( AB \) itself.

### Optimizing Ray-Casting with Bounding Boxes:

1. **Before checking every edge**: For every edge of the polygon, calculate its bounding box.

2. **Ray-box intersection check**: Perform a quick intersection check between the ray and the bounding box of the edge. This is a simpler and faster check than testing the ray directly with the edge.

3. **Skip edges that the ray doesn't intersect**: If the ray does not intersect the bounding box, you can skip testing that edge for intersection. This avoids unnecessary work.

4. **More complex tests only when needed**: For edges where the ray intersects the bounding box, you then perform the more detailed line-segment intersection tests to determine if the ray truly intersects the edge.

### Visualizing the Bounding Box:

If you think of a polygon with several edges, each edge will have its own bounding box. These bounding boxes help create a grid of potential intersections, and by processing these boxes first, you can greatly reduce the number of edge-to-ray intersection tests.

### In Summary:

-   A **bounding box** for an edge is the smallest rectangle (aligned with the coordinate axes) that fully contains the edge.
-   It’s used as a quick filter in algorithms like ray-casting to reduce the number of detailed intersection checks, improving performance.
-   The bounding box is calculated by taking the minimum and maximum x and y values of the edge’s endpoints.

Bounding boxes are a simple but powerful technique for speeding up geometric algorithms by reducing the complexity of intersection tests.
