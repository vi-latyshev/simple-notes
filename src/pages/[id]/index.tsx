import { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, makeStyles } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useForm } from 'react-hook-form';

import { Header } from 'components/Header';
import { NotesPage } from 'components/Page';
import { InputText } from 'components/controls';

// import { getNotesPageStaticPaths, getNotesPageStaticProps } from 'lib/pages/notes';
// import { getNotesList } from 'lib/api/db/notes';

// import type { GetStaticProps } from 'next';
import type { NoteData } from 'types/note';
// import type { NotesPageStaticProps } from 'lib/pages/notes';

// interface NotePageProps extends NotesPageStaticProps { }

const useStyles = makeStyles(() => ({
    noteContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        margin: '30px 0',
        '& > *:not(:first-child)': {
            marginTop: 15,
        },
    },
}));

const NotePage = () => {
    const classes = useStyles();
    const route = useRouter();

    const { control, trigger, formState } = useForm<NoteData>();

    const handleDeleteNote = useCallback(async () => {
        route.push('/');
    }, []);

    const handleChangeNote = useCallback(async () => {
        const isValid = await trigger();

        if (!isValid) {
            return;
        }
        route.push('/');
    }, []);

    return (
        <NotesPage>
            <Header title={`Задача №${1}`}>
                <Button
                    color="secondary"
                    endIcon={(
                        <Delete fontSize="inherit" />
                    )}
                    onClick={handleDeleteNote}
                >
                    Удалить
                </Button>
            </Header>
            <main className={classes.noteContainer}>
                <InputText
                    defaultValue="test"
                    control={control}
                    label="Краткое описание"
                    name="description"
                    rules={{ required: 'Заголовок не может быть пустым' }}
                />
                {formState.isDirty ? (
                    <Button onClick={handleChangeNote}>
                        Сохранить
                    </Button>
                ) : (
                    <Link href="/" passHref>
                        <Button>
                            Вернуться к списку
                        </Button>
                    </Link>
                )}
            </main>
        </NotesPage>
    );
};

export default NotePage;

// type NotePageQuery = {
//     id: string;
// };

// export const getStaticProps: GetStaticProps<NotesPageStaticProps, NotePageQuery> = async (ctx) => {
//     if (!ctx.params) {
//         throw Error('Cannot fetch note w/out params');
//     }

//     const { id } = ctx.params;

//     const notes = await getNotesList();

//     const foundedNote = notes.find((note) => note.id === id);
//     // const = {};

//     if (!foundedNote) {
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false,
//             },
//             revalidate: 1,
//         };
//     }

//     const noteStaticProps = await getNotesPageStaticProps();

//     return {
//         props: {
//             note: foundedNote,
//             swrFallback: {

//                 // a: { } as Note,
//                 // ...props.swrFallback,
//             },
//         },
//         revalidate: 1,
//     };
// };

// export const getStaticPaths = getNotesPageStaticPaths;
