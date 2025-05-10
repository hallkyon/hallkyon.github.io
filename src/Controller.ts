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

    public async getNotes(): Promise<Graph> {
        const request = await fetch('http://localhost:3000/api/notes');
        if (!request.ok) {
            throw new Error('Failed to fetch notes');
        }
        const graph = new Graph();
        const notes: string[] = await request.json();
        notes.forEach((filename) => {
            const note = new Note(filename);
            const vertex = new Vertex(note);
            graph.insertVertex(vertex);
        });
        return graph;
    }

    public async getContent(filename: string): Promise<string> {
        const request = await fetch(
            `http://localhost:3000/api/notes/${filename}`
        );
        if (!request.ok) {
            throw new Error('Failed to fetch note content');
        }
        return request.json();
    }

    public async createNote(filename: string, content: string): Promise<void> {
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

    public async editNote(filename: string, content: string): Promise<void> {
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

    public async deleteNote(filename: string): Promise<void> {
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
