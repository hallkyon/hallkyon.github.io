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
export default class Controller {
    constructor() { }
    static getInstance() {
        if (!Controller.instance) {
            Controller.instance = new Controller();
        }
        return Controller.instance;
    }
    getNotes() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield fetch('http://localhost:3000/api/notes');
            if (!request.ok) {
                throw new Error('Failed to fetch notes');
            }
            return request.json();
        });
    }
    getContent(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield fetch(`http://localhost:3000/api/notes/${filename}`);
            if (!request.ok) {
                throw new Error('Failed to fetch note content');
            }
            return request.json();
        });
    }
    createNote(filename, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield fetch('http://localhost:3000/api/notes', {
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
        });
    }
    editNote(filename, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield fetch(`http://localhost:3000/api/notes/${filename}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content }),
            });
            if (!request.ok) {
                throw new Error('Failed to save note');
            }
            return request.json();
        });
    }
    deleteNote(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield fetch(`http://localhost:3000/api/notes/${filename}`, {
                method: 'DELETE',
            });
            if (!request.ok) {
                throw new Error('Failed to delete note');
            }
            return request.json();
        });
    }
}
//# sourceMappingURL=Controller.js.map