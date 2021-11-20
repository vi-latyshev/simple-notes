import { v4 as uuidv4 } from 'uuid';

import {
    redis,
    NOTE_LIST_KEY,
    NOTE_INDEX_KEY,
    handlePipelineError,
} from 'lib/api/redis';

import type { Note, NoteData, NoteID } from 'types/note';

export const createNote = async (note: NoteData): Promise<Note> => {
    const noteIternalID = uuidv4();

    const pipe = redis.pipeline();

    pipe.rpush(NOTE_LIST_KEY, noteIternalID);
    pipe.hset(NOTE_INDEX_KEY(noteIternalID), { ...note });

    const pipeResp = await pipe.exec().then(handlePipelineError);

    const [newListLength] = pipeResp as [number, ...unknown[]];

    return {
        id: String(newListLength),
        ...note,
    };
};

export const deleteNote = async (noteId: NoteID): Promise<boolean> => {
    const { id } = noteId;

    const noteIternalID = await redis.lindex(NOTE_LIST_KEY, Number(id) - 1);

    if (noteIternalID === null) {
        return false;
    }
    const pipe = redis.pipeline();

    pipe.lrem(NOTE_LIST_KEY, 0, noteIternalID);
    pipe.del(NOTE_INDEX_KEY(noteIternalID));

    const pipeResp = await pipe.exec().then(handlePipelineError);

    const [countDeleted] = pipeResp as [number, number];

    return countDeleted > 0;
};

export const getNotesList = async (): Promise<Note[]> => {
    const noteIternalIDs = await redis.lrange(NOTE_LIST_KEY, 0, -1);

    if (noteIternalIDs.length === 0) {
        return [];
    }
    const pipe = redis.pipeline();

    noteIternalIDs.forEach((id) => pipe.hgetall(NOTE_INDEX_KEY(id)));

    const notesData: NoteData[] = await pipe.exec().then(handlePipelineError);

    const notes = notesData.map((note, index) => ({
        id: String(index + 1),
        ...note,
    }));

    return notes;
};
