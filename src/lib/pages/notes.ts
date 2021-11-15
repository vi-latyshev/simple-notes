import { GetStaticPaths, GetStaticPropsResult } from 'next';

import { getNotesList } from 'lib/api/db/notes';

import { ListNotesRes } from 'lib/api/routes/notes/list';

interface SWRFallback<T> {
    [apiEndpoint: string]: T;
}

export interface NotesPageStaticProps {
    swrFallback?: SWRFallback<ListNotesRes>;
}

export const getNotesPageStaticProps = async (): Promise<GetStaticPropsResult<NotesPageStaticProps>> => {
    const notes = await getNotesList();

    return {
        props: {
            swrFallback: {
                '/api/notes': notes,
            },
        },
        revalidate: 1 * 60 * 60, // 1 hour
    };
};

export const getNotesPageStaticPaths: GetStaticPaths = async () => {
    const notes = await getNotesList();
    const paths = notes.map((note) => ({
        params: {
            id: note.id,
        },
    }));

    return {
        paths,
        fallback: true,
    };
};
