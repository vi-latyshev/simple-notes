import { useCallback, useState } from 'react';
import { Button } from '@material-ui/core';

import { NotesPage } from 'components/Page';
import { Header } from 'components/Header';

import { AddNoteModalView, ListNotesView } from 'views/home';

import { getNotesPageStaticProps } from 'lib/pages/notes';

import type { NotesPageProps } from 'components/Page';

interface HomePageProps extends NotesPageProps { }

const HomePage = (props: HomePageProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenAddNote = useCallback(() => {
        setIsOpen(true);
    }, []);

    const handleCloseAddNote = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <NotesPage {...props}>
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
        </NotesPage>
    );
};

export default HomePage;

export const getStaticProps = getNotesPageStaticProps;
