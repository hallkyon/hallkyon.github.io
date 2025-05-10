// @prettier

import { describe, expect, it, beforeEach } from 'vitest';
import Note from '../src/Note.js';

let note: Note;

describe('Vector', () => {
    beforeEach(() => {
        note = new Note('test.txt', 'This is a test note.');
    });

    it('should create a Note', () => {
        expect(note.filename).toStrictEqual('test.txt');
        expect(note.content).toStrictEqual('This is a test note.');
    });

    it('should set and give back the filename', () => {
        note.filename = 'newTest.txt';
        expect(note.filename).toStrictEqual('newTest.txt');
    });

    it('should set and give back the content', () => {
        note.content = 'This is a new test note.';
        expect(note.content).toStrictEqual('This is a new test note.');
    });
});
