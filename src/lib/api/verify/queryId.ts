import { NextApiRequest } from 'next';

/**
 * @TODO throw as APIError with 400 code
 */
export const verifyQueryId = (query: NextApiRequest['query']): string => {
    if (typeof query.id !== 'string') {
        throw Error('Expected query to contain an ID param with type string');
    }

    return query.id;
};
