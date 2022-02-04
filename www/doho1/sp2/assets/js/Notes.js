import Storage from "./storage.js"
import NotesView from "./NotesView.js";

// main notes logic, calling other 2 classes for updating view and localStorage
export default class Notes {
    constructor(root, marker) {
        this.notes = [];
        this.activeNote = null;
        this.view = new NotesView(root, this._handlers(marker));

        this._refreshNotes(marker);
    }


    _refreshNotes(marker) {
        const notes = Storage.getAll(marker);

        this._setNotes(notes);
        
        if (notes.length > 0) {
            this._setActiveNote(notes[0]);
        }
    }

    _setNotes(notes) {
        this.notes = notes;
        this.view.updateNoteList(notes);
        this.view.updateNotePreviewVisibility(notes.length > 0);
    }

    _setActiveNote(note) {
        this.activeNote = note;
        this.view.updateActiveNote(note);
    }

    _handlers(marker) {
        return {
            onNoteSelect: noteId => {
                const selectedNote = this.notes.find(note => note.id == noteId);
                this._setActiveNote(selectedNote);
            },
            onNoteAdd: () => {
                const newNote = {
                    title: "My note",
                    body: ""
                };

                Storage.store(newNote, marker);
                this._refreshNotes(marker);
            },
            onNoteEdit: (title, body) => {
                Storage.store({
                    id: this.activeNote.id,
                    title,
                    body
                }, marker);

                this._refreshNotes(marker);
            },
            onNoteDelete: noteId => {
                Storage.delete(noteId, marker);
                this._refreshNotes(marker);
            },
        };
    }
}