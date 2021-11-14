export interface NoteID {
    id: string;
}

export interface NoteData {
    description: string;
}

export interface Note extends NoteID, NoteData { }
