// @prettier

import ControllerInterface from './interfaces/ControllerInterface';
import Graph from './Graph.js';
import Note from './Note.js';
import Vertex from './Vertex.js';

export default class Controller implements ControllerInterface {
    private static readonly filenameVertexMap: Map<string, Vertex> = new Map<
        string,
        Vertex
    >();
    private static readonly graph: Graph = new Graph();

    private static getVertex(filename: string): Vertex {
        const vertex = this.filenameVertexMap.get(filename);
        if (vertex === undefined) {
            throw new Error(`Vertex for filename ${filename} not found.`);
        }
        return vertex;
    }

    private static setVertex(filename: string): Vertex {
        if (this.filenameVertexMap.has(filename)) {
            throw new Error(`Vertex for filename ${filename} already exists.`);
        }
        const vertex = new Vertex(new Note(filename));
        Controller.graph.insertVertex(vertex);
        this.filenameVertexMap.set(filename, vertex);
        return vertex;
    }

    private static setEdge(filename: string, links: string[]): void {
        const vertexA = Controller.getVertex(filename);
        if (links.length > 0) {
            for (const link of links) {
                const vertexB = Controller.getVertex(link);
                Controller.graph.insertDirectedEdge(vertexA, vertexB);
            }
        }
    }

    private static checkGetNotesResponse(json: any): void {
        if (typeof json !== 'object' || json === null || Array.isArray(json)) {
            throw new Error('Invalid JSON format received');
        }
        for (const [key, value] of Object.entries(json)) {
            if (
                typeof key !== 'string' ||
                !Array.isArray(value) ||
                !value.every((item) => typeof item === 'string')
            ) {
                throw new Error(
                    'Invalid JSON structure: expected JSON object with arrays of strings as values'
                );
            }
        }
    }

    public static async getNotes(): Promise<Graph> {
        const request = await fetch('http://localhost:3000/api/notes');
        if (!request.ok) {
            throw new Error('Failed to fetch notes');
        }

        const json = await request.json();
        this.checkGetNotesResponse(json);

        for (const filename of Object.keys(json)) {
            Controller.setVertex(filename);
        }

        for (const [filename, links] of Object.entries(json)) {
            Controller.setEdge(filename, links as string[]);
        }
        return Controller.graph;
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
