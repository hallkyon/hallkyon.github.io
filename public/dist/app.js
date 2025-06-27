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
import Mapper from './Mapper.js';
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const graph = yield Mapper.getNotes();
        console.log('Graph loaded:', graph);
        Canvas.draw(graph);
    });
}
main();
//# sourceMappingURL=app.js.map