import Graph from './Graph';
import DrawingVertex from './DrawingVertex';

const titles = JSON.stringify({
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

const graph = JSON.stringify({
    vertices: {
        "mans-serach-for-meaning.html": { title: "...trotzdem Ja zum Leben sagen: Ein Psychologe erlebt das Konzentrationslager" },
        "personal-knowledge-management.html": { title: "Personal Knowledge Management" },
        "how-to-take-smart-notes.html": { title: "How to Take Smart Notes" },
        "building-a-second-brain.html": { title: "Building a Second Brain" },
        "the-lean-startup.html": { title: "The Lean Startup" },
        5: { title: "Placeholder Title" },
        6: { title: "Placeholder Title" },
        7: { title: "Placeholder Title" },
        8: { title: "Placeholder Title" },
        9: { title: "Placeholder Title" },
        10: { title: "Placeholder Title" },
        11: { title: "Placeholder Title" },
        12: { title: "Placeholder Title" },
        13: { title: "Placeholder Title" },
        14: { title: "Placeholder Title" },
        15: { title: "Placeholder Title" },
        16: { title: "Placeholder Title" },
        17: { title: "Placeholder Title" },
        18: { title: "Placeholder Title" },
        19: { title: "Placeholder Title" },
        20: { title: "Placeholder Title" },
        21: { title: "Placeholder Title" },
        22: { title: "Placeholder Title" },
        23: { title: "Placeholder Title" },
        24: { title: "Placeholder Title" },
        25: { title: "Placeholder Title" },
        26: { title: "Placeholder Title" },
        27: { title: "Placeholder Title" },
        28: { title: "Placeholder Title" },
        29: { title: "Placeholder Title" },
        30: { title: "Placeholder Title" },
        31: { title: "Placeholder Title" },
        32: { title: "Placeholder Title" },
    },
    edges: {
        "mans-search-for-meaning.html": [],
        "personal-knowledge-management.html": ["how-to-take-smart-notes.html", "building-a-second-brain.html"],
        "how-to-take-smart-notes.html": [],
        "building-a-second-brain.html": [],
        "the-lean-startup.html": [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
        10: [],
        11: [],
        12: [],
        13: [],
        14: [],
        15: [],
        16: [],
        17: [],
        18: [],
        19: [],
        20: [],
        21: [],
        22: [],
        23: [],
        24: [],
        25: [],
        26: [],
        27: [],
        28: [],
        29: [],
        30: [],
        31: [],
        32: [],
    }
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
