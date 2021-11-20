import { NextApiRequest as Req, NextApiResponse as Res } from 'next';

import { createNote } from 'lib/api/db/notes';

import type { Note, NoteData } from 'types/note';

interface CreateNoteReqBody extends NoteData { }

export type CreateNoteRes = Note;

/**
 * hard code for validation
 *
 * - description:
 *      - max-length - 150
 * - no additional fields
 */
const checkReqBody = ({ description, ...rest }: CreateNoteReqBody): boolean => (
    description === undefined
    || typeof description !== 'string'
    || description.length >= 150
    || Object.keys(rest).length === 0
);

export const createNoteAPI = async (req: Req, res: Res<CreateNoteRes>) => {
    try {
        const note = req.body as CreateNoteReqBody;

        if (typeof note !== 'object' || !checkReqBody(note)) {
            res.status(400).end(JSON.stringify({ error: 'Invalid request body' }));

            return;
        }
        const createdNote = await createNote(req.body);

        res.status(201).json({ ...createdNote });
    } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(e);
        res.status(500).end(JSON.stringify({ error: 'failed to load data' }));
    }
};
