// @prettier
export default class Note {
    constructor(filename, content = '') {
        this._filename = filename;
        this._content = content;
    }
    get filename() {
        return this._filename;
    }
    set filename(newFilename) {
        this._filename = newFilename;
    }
    get content() {
        return this._content;
    }
    set content(newContent) {
        this._content = newContent;
    }
}
//# sourceMappingURL=Note.js.map