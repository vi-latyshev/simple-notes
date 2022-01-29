import { fetchNoteAPI } from 'lib/api/routes/notes/fetch';
import { deleteNoteAPI } from 'lib/api/routes/notes/detele';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { FetchNoteRes } from 'lib/api/routes/notes/fetch';
import type { DeleteNoteRes } from 'lib/api/routes/notes/detele';

export default async function notes(
    req: NextApiRequest,
    res: NextApiResponse<DeleteNoteRes | FetchNoteRes>,
) {
    const { method } = req;

    switch (method) {
        case 'GET':
            await fetchNoteAPI(req, res);
            break;
        case 'PUT':
            break;
        case 'DELETE':
            await deleteNoteAPI(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}
