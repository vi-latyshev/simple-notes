import type { NextApiRequest, NextApiResponse } from 'next';

import { listNotesAPI } from 'lib/api/routes/notes/list';

import type { ListNotesRes } from 'lib/api/routes/notes/list';

export default async function notes(
    req: NextApiRequest,
    res: NextApiResponse<ListNotesRes>,
) {
    const { method } = req;

    switch (method) {
        case 'GET':
            await listNotesAPI(req, res);
            break;
        case 'POST':
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}
