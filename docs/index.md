# Graph-Note

## Classes

- Canvas
- Controller
- Graph
- Point
- Vector
- Vertex
- Note
- Embedder
- Drawing

## Model-View-Controller

The idea is to represent a bunch of Markdown files and their links to each other
as a Graph. We seperate the visual representation of the graph and its data
structure. The datastructure is encapsulated in the `Graph` class. The Graph is
then drawn on a `Canvas`. How each node is positioned on the Canvas is done by
the `EadesEmbedder`. In this example the `Canvas` and `EadesEmbedder` is the _View_, while
the `Graph` is the _Model_. At this Moment, we do not have user interaction, so
the _Controller_ is missing.

Another problem occurs with interacting with the UI. If I implement an click
event, that triggers a request to a server, then the direct approach would be to
let the UI interact with the API directly. I want to avoid that and possibly
only let the Controller interact with the API. For this reason, the Controller
is a class with only public static methods that are wrappers for each API call
possible on the server.

The `Note` object
