# Graph-Note

## Model-View-Controller

The idea is to represent a bunch of Markdown files and their links to each other
as a Graph. We seperate the visual representation of the graph and its data
structure. The datastructure is encapsulated in the `Graph` class. The Graph is
then drawn on a `Canvas`. How each node is positioned on the Canvas is done by
the `EadesEmbedder`. In this example the `Canvas` and `EadesEmbedder` is the _View_, while
the `Graph` is the _Model_. At this Moment, we do not have user interaction, so
the _Controller_ is missing.
