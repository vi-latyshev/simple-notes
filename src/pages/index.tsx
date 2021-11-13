import { useCallback, useState } from 'react';
import { Button, Typography, makeStyles } from '@material-ui/core';

import { Page } from 'components/Page';
import { NoteItem } from 'components/NoteItem';
import { AddNoteDialog } from 'components/AddNoteDialog';

import type { NextPage } from 'next';
import type { AddNoteDialogProps } from 'components/AddNoteDialog';

const useStyles = makeStyles({
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    header: {
        flex: 1,
    },
    notesContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: '30px 0',
    },
});

const Home: NextPage = () => {
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
            <div className={classes.headerContainer}>
                <Typography variant="h1" className={classes.header}>
                    Список задач
                </Typography>
                <Button
                    color="primary"
                    variant="outlined"
                    onClick={handleOpenAddNote}
                >
                    Добавить
                </Button>
            </div>
            <div className={classes.notesContainer}>
                {/* н/д */}
                <NoteItem index={1} description="test" />
                <NoteItem index={2} description="test 2" />
            </div>
            <AddNoteDialog
                isOpen={isOpen}
                onAdd={handleOnAddNote}
                onClose={handleCloseAddNote}
            />
        </Page>
    );
};

export default Home;
