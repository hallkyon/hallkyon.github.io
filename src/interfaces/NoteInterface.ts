// @prettier

export default interface NoteInterface {
    get filename(): string;
    set filename(newFilename: string);
    get content(): string;
    set content(newContent: string);
}
