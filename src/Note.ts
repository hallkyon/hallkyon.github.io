// @prettier

import NoteInterface from './interfaces/NoteInterface.js';

export default class Note implements NoteInterface {
    private _filename: string;
    private _content: string;

    constructor(filename: string, content = '') {
        this._filename = filename;
        this._content = content;
    }

    public get filename(): string {
        return this._filename;
    }

    public set filename(newFilename: string) {
        this._filename = newFilename;
    }

    public get content(): string {
        return this._content;
    }

    public set content(newContent: string) {
        this._content = newContent;
    }
}
