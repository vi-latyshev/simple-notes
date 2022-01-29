export type NoteID = string;

export type NoteData = {
    description: string;
};

export type Note = NoteData & {
    id: NoteID;
};
