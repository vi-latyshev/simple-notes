import { NextApiRequest as Req, NextApiResponse as Res } from 'next';

import { getNotesList } from 'lib/api/db/notes';

import type { Note } from 'types/note';

export interface ListNotesRes {
    notes: Note[];
}

export const listNotesAPI = async (_req: Req, res: Res<ListNotesRes>) => {
    try {
        const notes = await getNotesList();

        res.json({ notes });
    } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(e);
        res.status(500).end({ error: 'failed to load data' });
    }
};
