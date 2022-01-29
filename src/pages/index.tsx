import { NotesPage } from 'components/Page';
import { HeaderNotesView, ListNotesView } from 'views/home';

import { getNotesList } from 'lib/api/db/notes';

import type { GetStaticProps } from 'next';
import type { NotesPageStaticProps } from 'components/Page';
import type { Note } from 'types/note';

type NotesPageData = Note[];

interface HomePageProps<T> extends NotesPageStaticProps<T> { }

const HomePage = (props: HomePageProps<NotesPageData>) => (
    <NotesPage {...props}>
        <HeaderNotesView />
        <ListNotesView />
    </NotesPage>
);

export const getStaticProps: GetStaticProps<HomePageProps<NotesPageData>> = async () => {
    const notes = await getNotesList();

    return {
        props: {
            swrFallback: {
                '/api/notes': notes,
            },
        },
        revalidate: 10,
    };
};

export default HomePage;
