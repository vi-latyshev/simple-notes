import { NotesPage } from 'components/Page';
import { HeaderNoteView, NoteEditView } from 'views/note';

import { getNote, getNotesList } from 'lib/api/db/notes';

import type { GetStaticProps, GetStaticPaths } from 'next';
import type { NotesPageStaticProps } from 'components/Page';
import type { Note } from 'types/note';
import { useNote } from 'hooks/useNote';

type NotePageData = Note;

interface NotePageProps<T> extends NotesPageStaticProps<T> { }

type NotePageQuery = {
    id: string;
};

const NotePage = (props: NotePageProps<NotePageData>) => {
    const { note } = useNote();

    return (
        <NotesPage
            meta={{
                title: note ? `Задача №${note.id}` : 'Загрузка',
                description: note?.description,
            }}
            {...props}
        >
            <HeaderNoteView />
            <NoteEditView />
        </NotesPage>
    );
};

export const getStaticProps: GetStaticProps<NotePageProps<NotePageData>, NotePageQuery> = async (
    ctx,
) => {
    if (!ctx.params) {
        throw Error('Cannot fetch note w/out params');
    }
    const { id } = ctx.params;
    const note = await getNote(id);
    console.log(id, 'id');
    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log(note, 'note getStaticProps');

    if (!note) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
            revalidate: 1,
        };
    }

    console.log(id, 'id getStaticProps');

    return {
        props: {
            swrFallback: {
                [`/api/notes/${id}`]: note,
            },
        },
        revalidate: 1,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
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

export default NotePage;
