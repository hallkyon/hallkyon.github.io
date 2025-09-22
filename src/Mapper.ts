import Graph from './Graph';
import DrawingVertex from './DrawingVertex';

const titles = JSON.stringify({
    '...trotzdem Ja zum Leben sagen: Ein Psychologe erlebt das Konzentrationslager':
        [],
    'Personal Knowledge Management': [
        'How to Take Smart Notes',
        'Building a Second Brain',
    ],
    'How to Take Smart Notes': [],
    'Building a Second Brain': [],
    'The Lean Startup': [],
    'Jostein Gaarder': ['Sofies Welt', 'Das Orangenmädchen'],
    'Sofies Welt': [],
    'Das Orangenmädchen': [],
    'Genzaburo Yoshino': ['How do you live?'],
    'How do you live?': [],
    'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones':
        [],
    'Open Circuits: The inner Beauty of Electronic Components': [],
    'Das Wandelnde Schloss': [],
    'A Philosophy of Software Design': [],
    'Embedded Linux mit Raspberry Pi und Co.': [],
    'Algorithms to Live By: The Computer Science of Human Decisions': [],
    'Jane Austen': ['Pride and Prejudice', 'Sense and Sensibility'],
    'Pride and Prejudice': [],
    'Sense and Sensibility': [],
    'John Williams': ['Stoner'],
    Stoner: [],
    'Liu Cixin': ['The Three Body Problem', 'The Dark Forest', "Death's End"],
    'The Three Body Problem': ['The Dark Forest'],
    'The Dark Forest': ["Death's End"],
    "Death's End": ['Redemption of Time'],
    Baoshu: ['Liu Cixin', 'Redemption of Time'],
    'Redemption of Time': [],
    'The Fault in our Stars': [],
    'Sylvain Neuvel': ['Sleeping Giants', 'Walking Gods', 'Only Human'],
    'Sleeping Giants': ['Walking Gods'],
    'Walking Gods': ['Only Human'],
    'Only Human': [],
    'William Gibson': ['Neuromancer', 'Count Zero', 'Mona Lisa Overdrive'],
    Neuromancer: ['Count Zero'],
    'Count Zero': ['Mona Lisa Overdrive'],
    'Mona Lisa Overdrive': [],
});

export default class Mapper {
    private static toGraph(response: string): Graph<DrawingVertex> {
        const drawingMap = new Map<string, DrawingVertex>();
        const graph = new Graph<DrawingVertex>();
        const data = JSON.parse(response);
        Object.keys(data).forEach((vertex: string) => {
            const drawingVertex = new DrawingVertex(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight,
                vertex
            );
            graph.insertVertex(drawingVertex);
            drawingMap.set(vertex, drawingVertex);
        });

        Object.keys(data).forEach((vertexA: string) => {
            data[vertexA].forEach((vertexB: string) => {
                const drawingA = drawingMap.get(vertexA);
                const drawingB = drawingMap.get(vertexB);
                if (drawingA === undefined || drawingB === undefined) {
                    throw new Error('Vertices not found in map');
                }
                graph.insertUndirectedEdge(drawingA, drawingB);
            });
        });
        return graph;
    }

    public static getGraph(): Graph<DrawingVertex> {
        return Mapper.toGraph(titles);
    }
}
