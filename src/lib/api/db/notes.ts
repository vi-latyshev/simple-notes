import {
    redis,
    NOTE_LIST_KEY,
    NOTE_INDEX_KEY,
    handlePipelineError,
} from 'lib/redis';

import type { Note, NoteData } from 'types/note';

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
