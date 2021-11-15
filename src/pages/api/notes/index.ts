import type { NextApiRequest, NextApiResponse } from 'next';

import { listNotesAPI } from 'lib/api/routes/notes/list';
import { createNoteAPI } from 'lib/api/routes/notes/create';

import type { ListNotesRes } from 'lib/api/routes/notes/list';
import type { CreateNoteRes } from 'lib/api/routes/notes/create';

export default async function notes(
    req: NextApiRequest,
    res: NextApiResponse<ListNotesRes | CreateNoteRes>,
) {
    const { method } = req;

    switch (method) {
        case 'GET':
            await listNotesAPI(req, res);
            break;
        case 'POST':
            await createNoteAPI(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}
