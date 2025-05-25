// @prettier

import ControllerInterface from './interfaces/ControllerInterface';
import Graph from './Graph.js';
import Note from './Note.js';
import Vertex from './Vertex.js';

export default class Controller implements ControllerInterface {
    private static instance: Controller;

    private constructor() {}

    public static getInstance(): Controller {
        if (!Controller.instance) {
            Controller.instance = new Controller();
        }
        return Controller.instance;
    }

    public static async getNotes(): Promise<Graph> {
        const request = await fetch('http://localhost:3000/api/notes');
        if (!request.ok) {
            throw new Error('Failed to fetch notes');
        }
        const graph = new Graph();
        const notes = await request.json();
        const FilenameVertexMap = new Map<string, Vertex>();

        for (const filename of Object.keys(notes)) {
            const note = new Note(filename);
            const vertexA = new Vertex(note);
            FilenameVertexMap.set(filename, vertexA);
            graph.insertVertex(vertexA);
        }

        console.log(FilenameVertexMap);

        for (const [filename, links] of Object.entries(notes)) {
            const vertexA = FilenameVertexMap.get(filename);
            if (vertexA === undefined) {
                throw new Error(
                    `Could not find vertex ${filename} => ${vertexA})`
                );
            }
            if (Array.isArray(links) && links.length > 0) {
                for (const link of links) {
                    const vertexB = FilenameVertexMap.get(link);
                    if (vertexB === undefined) {
                        throw new Error(
                            `Could not find vertex ${link} => ${vertexB})`
                        );
                    }
                    graph.insertDirectedEdge(vertexA, vertexB);
                }
            }
        }
        return graph;
    }

    public static async getContent(filename: string): Promise<Note> {
        const request = await fetch(
            `http://localhost:3000/api/notes/${filename}`
        );
        if (!request.ok) {
            throw new Error('Failed to fetch note content');
        }
        const data = await request.json();
        const note = new Note(data.filename, data.content);
        return note;
    }

    public static async createNote(
        filename: string,
        content: string
    ): Promise<void> {
        const request = await fetch('http://localhost:3000/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ filename, content }),
        });
        if (!request.ok) {
            throw new Error('Failed to create note');
        }
        return request.json();
    }

    public static async editNote(
        filename: string,
        content: string
    ): Promise<void> {
        const request = await fetch(
            `http://localhost:3000/api/notes/${filename}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content }),
            }
        );
        if (!request.ok) {
            throw new Error('Failed to save note');
        }
        return request.json();
    }

    public static async deleteNote(filename: string): Promise<void> {
        const request = await fetch(
            `http://localhost:3000/api/notes/${filename}`,
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
