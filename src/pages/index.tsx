import { useCallback, useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';

import { Page } from 'components/Page';
import { Header } from 'components/Header';
import { NoteItem } from 'components/NoteItem';
import { AddNoteDialog } from 'components/AddNoteDialog';

import type { AddNoteDialogProps } from 'components/AddNoteDialog';

const useStyles = makeStyles({
    notesContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: '30px 0',
    },
});

const Home = () => {
    const classes = useStyles();

    const [isOpen, setIsOpen] = useState(false);

    const handleOpenAddNote = useCallback(() => {
        setIsOpen(true);
    }, []);

    const handleCloseAddNote = useCallback(() => {
        setIsOpen(false);
    }, []);

    const handleOnAddNote: AddNoteDialogProps['onAdd'] = useCallback((_values) => {

    }, []);

    return (
        <Page>
            <Header title="Список задач">
                <Button onClick={handleOpenAddNote}>
                    Добавить
                </Button>
            </Header>
            <AddNoteDialog
                isOpen={isOpen}
                onAdd={handleOnAddNote}
                onClose={handleCloseAddNote}
            />
            <main className={classes.notesContainer}>
                {/* н/д */}
                <NoteItem index={1} description="test" />
                <NoteItem index={2} description="test 2" />
            </main>
        </Page>
    );
};

export default Home;
