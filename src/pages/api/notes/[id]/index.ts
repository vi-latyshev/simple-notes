import { deleteNoteAPI } from 'lib/api/routes/notes/detele';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { DeleteNoteRes } from 'lib/api/routes/notes/detele';

export default async function notes(
    req: NextApiRequest,
    res: NextApiResponse<DeleteNoteRes>,
) {
    const { method } = req;

    switch (method) {
        case 'GET':
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
