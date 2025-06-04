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
import Canvas from './Canvas.js';
import Controller from './Controller.js';
import UserInterface from './UserInterface.js';
import EadesEmbedder from './EadesEmbedder.js';
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const canvas = Canvas.getInstance();
            const graph = yield Controller.getNotes();
            const saveButton = UserInterface.getSaveButton();
            saveButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                const note = UserInterface.getNote();
                Controller.putNote(note).then(() => {
                    console.log('Note saved successfully');
                });
            }));
            canvas.setEmbedder(graph, EadesEmbedder.embedder);
        }
        catch (error) {
            console.error('Error initializing application:', error);
        }
    });
}
main();
//# sourceMappingURL=app.js.map