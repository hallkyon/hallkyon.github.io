// @prettier
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Graph from './Graph.js';
import Note from './Note.js';
import Vertex from './Vertex.js';
class Controller {
    static getVertex(filename) {
        const vertex = this.filenameVertexMap.get(filename);
        if (vertex === undefined) {
            throw new Error(`Vertex for filename ${filename} not found.`);
        }
        return vertex;
    }
    static setVertex(filename) {
        if (this.filenameVertexMap.has(filename)) {
            throw new Error(`Vertex for filename ${filename} already exists.`);
        }
        const vertex = new Vertex(new Note(filename));
        Controller.graph.insertVertex(vertex);
        this.filenameVertexMap.set(filename, vertex);
        return vertex;
    }
    static setEdge(filename, links) {
        const vertexA = Controller.getVertex(filename);
        if (links.length > 0) {
            for (const link of links) {
                const vertexB = Controller.getVertex(link);
                Controller.graph.insertDirectedEdge(vertexA, vertexB);
            }
        }
    }
    static checkGetNotesResponse(json) {
        if (typeof json !== 'object' || json === null || Array.isArray(json)) {
            throw new Error('Invalid JSON format received');
        }
        for (const [key, value] of Object.entries(json)) {
            if (typeof key !== 'string' ||
                !Array.isArray(value) ||
                !value.every((item) => typeof item === 'string')) {
                throw new Error('Invalid JSON structure: expected JSON object with arrays of strings as values');
            }
        }
    }
    static getNotes() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield fetch('http://localhost:3000/api/notes');
            if (!request.ok) {
                throw new Error('Failed to fetch notes');
            }
            const json = yield request.json();
            this.checkGetNotesResponse(json);
            for (const filename of Object.keys(json)) {
                Controller.setVertex(filename);
            }
            for (const [filename, links] of Object.entries(json)) {
                Controller.setEdge(filename, links);
            }
            return Controller.graph;
        });
    }
    static getNote(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield fetch(`http://localhost:3000/api/notes/${filename}`);
            if (!request.ok) {
                throw new Error('Failed to get note');
            }
            const data = yield request.json();
            if (typeof data.filename !== 'string' ||
                typeof data.content !== 'string') {
                throw new Error('Invalid note data received');
            }
            const note = new Note(data.filename, data.content);
            return note;
        });
    }
    static postNote(note) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield fetch('http://localhost:3000/api/notes', {
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
        });
    }
    static putNote(note) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield fetch(`http://localhost:3000/api/notes/${note.filename}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: note.content }),
            });
            if (!request.ok) {
                throw new Error('Failed to put note');
            }
            return request.json();
        });
    }
    static deleteNote(note) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield fetch(`http://localhost:3000/api/notes/${note.filename}`, {
                method: 'DELETE',
            });
            if (!request.ok) {
                throw new Error('Failed to delete note');
            }
            return request.json();
        });
    }
}
Controller.filenameVertexMap = new Map();
Controller.graph = new Graph();
export default Controller;
//# sourceMappingURL=Controller.js.map