# GraphNote

Notes visualized as a graph.

## To be implemented

-   A proper graph view. At the moment a graph layout by **Eades** should be
    sufficient. It is the easiest layouting algorithm that I know of.

## Ideas

-   Implement a routing strategy to seperate the vertex layout on the graph and
    how the edges are drawn. There could then be a routing strategy that draws the
    edges as straight lines or like a orthogonal drawing.

-   Implement a z-axis that shrinks the size of the nodes on the graph. The size
    of the onte could then indicate a "last read" information. The longer it has
    been since the last visit, the smaller it gets on the canvas. My hope is then,
    that this mechanism will declutter the graph view, once there are a lot of
    nodes.
