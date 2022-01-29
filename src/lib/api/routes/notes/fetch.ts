import { verifyQueryId } from 'lib/api/verify/queryId';
import { getNote } from 'lib/api/db/notes';

import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import type { Note, NoteID } from 'types/note';

export type FetchNoteRes = Note;

export const fetchNoteAPI = async (req: Req, res: Res<FetchNoteRes>) => {
    try {
        const noteId: NoteID = verifyQueryId(req.query);
        const note = await getNote(noteId);

        if (note === null) {
            res.status(404).end(JSON.stringify({ error: `Note (${noteId}) does not exist` }));

            return;
        }
        res.status(200).json({ ...note });
    } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(e);
        res.status(500).end(JSON.stringify({ error: 'failed to load data' }));
    }
};
