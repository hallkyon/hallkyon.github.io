import Note from './Note.js';

export default class UserInterface {
    private static getInput(): HTMLInputElement {
        const input = document.querySelector('.editor-title');
        if (input instanceof HTMLInputElement) {
            return input;
        } else {
            throw new Error('Input not found or is not an input element');
        }
    }

    private static getTextarea(): HTMLTextAreaElement {
        const textarea = document.querySelector('.editor-content');
        if (textarea instanceof HTMLTextAreaElement) {
            return textarea;
        } else {
            throw new Error('Textarea not found or is not a textarea element');
        }
    }

    public static getNote(): Note {
        const input = UserInterface.getInput();
        const textarea = UserInterface.getTextarea();
        const filename = input.value.trim();
        const content = textarea.value.trim();
        return new Note(filename, content);
    }

    public static setNote(note: Note): void {
        const input = UserInterface.getInput();
        const textarea = UserInterface.getTextarea();
        input.value = note.filename;
        textarea.value = note.content;
    }

    public static getSaveButton(): HTMLButtonElement {
        const button = document.querySelector('.save-button');
        if (button instanceof HTMLButtonElement) {
            return button;
        } else {
            throw new Error('Save button not found or is not a button element');
        }
    }
}
