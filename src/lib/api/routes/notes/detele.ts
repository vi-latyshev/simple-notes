import { verifyQueryId } from 'lib/api/verify/queryId';
import { deleteNote } from 'lib/api/db/notes';

import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import type { NoteID } from 'types/note';

export type DeleteNoteRes = void;

export const deleteNoteAPI = async (req: Req, res: Res<DeleteNoteRes>) => {
    try {
        const noteId: NoteID = verifyQueryId(req.query);
        const isRemoved = await deleteNote(noteId);

        if (!isRemoved) {
            res.status(404).end(JSON.stringify({ error: `Note (${noteId}) does not exist` }));

            return;
        }
        res.status(204).end();
    } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(e);
        res.status(500).end(JSON.stringify({ error: 'failed to load data' }));
    }
};
