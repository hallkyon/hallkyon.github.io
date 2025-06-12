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
export default class Mapper {
    static randomGraph(order) {
        const graph = new Graph();
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
    static getGraph() {
        return Mapper.randomGraph(30);
    }
    static getNotes() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield fetch('http://localhost:3000/api/notes');
            if (!request.ok) {
                throw new Error('Failed to fetch notes');
            }
            const graph = new Graph();
            const json = yield request.json();
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
            console.log('Graph created with vertices:', graph.vertices, 'and edges:', graph.edges);
            return graph;
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
//# sourceMappingURL=Mapper.js.map