// @prettier

import MapperInterface from './interfaces/MapperInterface';
import Graph from './Graph.js';
import Note from './Note.js';

export default class Mapper implements MapperInterface {
    private static randomGraph(order: number): Graph<Note> {
        const graph = new Graph<Note>();

        for (let i = 0; i < order; i++) {
            const note = new Note(`note-${i}`, `Content of note ${i}`);
            graph.insertVertex(note);
        }

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

    public static getGraph(): Graph<Note> {
        return Mapper.randomGraph(30);
    }

    public static async getNotes(): Promise<Graph<string>> {
        const request = await fetch('http://localhost:3000/api/notes');
        if (!request.ok) {
            throw new Error('Failed to fetch notes');
        }

        const graph = new Graph<string>();
        const json = await request.json();
        const keys = Object.keys(json);

        keys.forEach((key) => {
            graph.insertVertex(key);
        });

        Object.entries(json).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((v) => {
                    if (typeof v === 'string') {
                        graph.insertUndirectedEdge(key, v);
                    }
                });
            }
        });

        return graph;
    }

    public static async getNote(filename: string): Promise<Note> {
        const request = await fetch(
            `http://localhost:3000/api/notes/${filename}`
        );
        if (!request.ok) {
            throw new Error('Failed to get note');
        }
        const data = await request.json();
        if (
            typeof data.filename !== 'string' ||
            typeof data.content !== 'string'
        ) {
            throw new Error('Invalid note data received');
        }
        const note = new Note(data.filename, data.content);
        return note;
    }

    public static async postNote(note: Note): Promise<void> {
        const request = await fetch('http://localhost:3000/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filename: note.filename,
                content: note.content,
            }),
        });
        if (!request.ok) {
            throw new Error('Failed to post note');
        }
        return request.json();
    }

    public static async putNote(note: Note): Promise<void> {
        const request = await fetch(
            `http://localhost:3000/api/notes/${note.filename}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: note.content }),
            }
        );
        if (!request.ok) {
            throw new Error('Failed to put note');
        }
        return request.json();
    }

    public static async deleteNote(note: Note): Promise<void> {
        const request = await fetch(
            `http://localhost:3000/api/notes/${note.filename}`,
            {
                method: 'DELETE',
            }
        );
        if (!request.ok) {
            throw new Error('Failed to delete note');
        }
        return request.json();
    }
}
