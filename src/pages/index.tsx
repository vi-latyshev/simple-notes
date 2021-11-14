import { useCallback, useState } from 'react';
import { Button } from '@material-ui/core';

import { Page } from 'components/Page';
import { Header } from 'components/Header';

import { AddNoteModalView, ListNotesView } from 'views/home';

import { getNotesList } from 'lib/api/db/notes';

import type { GetStaticProps } from 'next';
import type { NextPageProps } from 'types/page';
import type { ListNotesRes } from 'lib/api/routes/notes/list';

interface HomePageProps extends NextPageProps<ListNotesRes> { }

const Home = ({ swrFallback }: HomePageProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenAddNote = useCallback(() => {
        setIsOpen(true);
    }, []);

    const handleCloseAddNote = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <Page swrFallback={swrFallback}>
            <Header title="Список задач">
                <Button onClick={handleOpenAddNote}>
                    Добавить
                </Button>
            </Header>
            <AddNoteModalView
                isOpen={isOpen}
                onClose={handleCloseAddNote}
            />
            <ListNotesView />
        </Page>
    );
};

export default Home;

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
    const notes = await getNotesList();

    return {
        props: {
            swrFallback: {
                '/api/notes': { notes },
            },
        },
        revalidate: 1,
    };
};
