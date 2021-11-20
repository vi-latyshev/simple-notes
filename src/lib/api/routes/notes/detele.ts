import { NextApiRequest as Req, NextApiResponse as Res } from 'next';

import { deleteNote } from 'lib/api/db/notes';

import type { NoteID } from 'types/note';

export type DeleteNoteRes = void;

export const deleteNoteAPI = async (req: Req, res: Res<DeleteNoteRes>) => {
    try {
        const noteId = req.query as Partial<NoteID>;

        if (typeof noteId.id !== 'string') {
            res.status(400).end(JSON.stringify({ error: 'Expected query to contain an ID param with type string' }));

            return;
        }
        const isRemoved = await deleteNote(noteId as Required<NoteID>);

        if (!isRemoved) {
            res.status(404).end(JSON.stringify({ error: `Note (${noteId.id}) does not exist` }));

            return;
        }
        res.status(204).end();
    } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(e);
        res.status(500).end(JSON.stringify({ error: 'failed to load data' }));
    }
};
