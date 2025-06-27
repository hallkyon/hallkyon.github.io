# Drawing Edges Between Vertices

We have two rectangles A and B that do not overlap and we will try to connect these two with a line. The rectangles represent vertices in a graph, and the line represents the edge connecting them. We care about a few aesthetic criteria for the edge:

1. The edge should be a straight line
2. It should be as short as possible
3. Since the vertices will move smoothly around on a canvas, the endpoints of the line should also move smoothly.

Maybe the 3rd criteria needs more explanation. Lets assume we simply connect the two rectangles by the two corners that are closest to each other. If one rectangle would move from the top-left to top-right relative to the other rectangle, the closest corners would immediately jump from bottom-right corner (top-left corner for the other rectangle) to the bottom-left (top-right for the other one). What we want is, that the line also moves smoothly, so the endpoint should move smoothly along the edge of the rectangle from one corner to the other.

We are only looking at the bottom and top lines of the rectangle A and rectangle B. We connect the bottom-left corner of rectangle A with the top-left corner of rectangle B and the bottom-right corner of rectangle A with the top-left corner of rectangle B. The result is a crossing between the two lines and we are interested in the x-value of the crossing point.

```math
f(x) = \frac{A_{top} - B_{bottom}}{A_{right} - B_{left}} * (x - B_{left}) + B_{bottom} \\
g(x) = \frac{A_{top} - B_{bottom}}{A_{left} - B_{right}} * (x - B_{right}) + B_{bottom} \\
\\
f(x) = g(x) \\
\\
\frac{A_{top} - B_{bottom}}{A_{right} - B_{left}} * (x - B_{left}) + B_{bottom} = \frac{A_{top} - B_{bottom}}{A_{left} - B_{right}} * (x - B_{right}) + B_{bottom} \\
\\
\frac{1}{A_{right} - B_{left}} * (x - B_{left}) = \frac{1}{A_{left} - B_{right}} * (x - B_{right}) \\
\\
(A_{left} - B_{right}) * (x - B_{left}) = (A_{right} - B_{left}) * (x - B_{right}) \\
\\
x(A_{left} - B_{right}) - B_{left}(A_{left} - B_{right}) = x(A_{right} - B_{left}) - B_{right}(A_{right} - B_{left}) \\
\\
x(A_{left} - B_{right}) - x(A_{right} - B_{left}) =  B_{left}(A_{left} - B_{right}) - B_{right}(A_{right} - B_{left}) \\
\\
x(A_{left} - A_{right} + B_{left} - B_{right}) =  A_{left}B_{left} - B_{left}B_{right} - A_{right}B_{right} + B_{left}B_{right} \\
\\
x = \frac{A_{left}B_{left} - A_{right}B_{right}}{A_{left} - A_{right} + B_{left} - B_{right}} \\
\\
```
