import Graph from './Graph';

const titles: string[] = [
    '...trotzdem Ja zum Leben sagen: Ein Psychologe erlebt das Konzentrationslager',
    'How to Take Smart Notes',
    'Building a Second Brain',
    'The Lean Startup',
    'Sofies Welt',
    'How do you live?',
    'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
    'Open Circuits: The inner Beauty of Electronic Components',
    'Das Wandelnde Schloss',
    'A Philosophy of Software Design',
    'Embedded Linux mit Raspberry Pi und Co.',
    'Algorithms to Live By: The Computer Science of Human Decisions',
    'Pride and Prejudice',
    'Sense and Sensibility',
    'Stoner',
    'The Three Body Problem',
    'The Dark Forest',
    "Death's End",
    'The Fault in our Stars',
    'Only Human',
    'Walking Gods',
    'Sleeping Giants',
];

export default class Mapper {
    private static randomGraph(titles: string[]): Graph<string> {
        const graph = new Graph<string>();

        titles.forEach((title) => {
            graph.insertVertex(title);
        });

        graph.vertices.forEach((vertexA) => {
            graph.vertices.forEach((vertexB) => {
                if (vertexA === vertexB) {
                    return;
                }
                if (Math.random() > 0.98) {
                    graph.insertUndirectedEdge(vertexA, vertexB);
                }
            });
        });

        return graph;
    }

    public static getGraph(): Graph<string> {
        return Mapper.randomGraph(titles);
    }
}
