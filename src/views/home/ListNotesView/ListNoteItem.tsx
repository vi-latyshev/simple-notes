import Link from 'next/link';
import { useCallback } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { Create, Delete } from '@material-ui/icons';
import axios from 'axios';

import { useNotesList } from 'hooks/useNotesList';

import type { Note } from 'types/note';
import type { DeleteNoteRes } from 'lib/api/routes/notes/detele';

interface ListNoteItemProps extends Note { }

const useStyles = makeStyles(({ palette }) => ({
    note: {
        display: 'flex',
        flexDirection: 'row',
        '& > *': {
            display: 'flex',
            alignItems: 'center',
            padding: '10px 15px',
            border: `1px solid ${palette.background.default}`,
        },
        '&:not(:last-child) > *': {
            borderBottom: 'none',
        },
    },
    index: {
        width: 100,
    },
    description: {
        flex: '1 auto',
        borderLeft: 'none',
        borderRight: 'none',
    },
    buttonContainer: {
        '& > *': {
            margin: '0 5px',
        },
    },
    button: {
        padding: 7,
        minWidth: 32,
    },
}));

export const ListNoteItem = ({
    id,
    description,
}: ListNoteItemProps) => {
    const classes = useStyles();

    const { mutate } = useNotesList();

    const handleDeleteNote = useCallback(async () => {
        mutate(async (notes = []) => {
            const filteredNotes = notes.filter((note) => note.id !== id)
                .map(({ id: _id, ...note }, index) => ({ id: String(index + 1), ...note }));

            await axios.delete<DeleteNoteRes>(`/api/notes/${id}`);

            return filteredNotes;
        }, false);
    }, []);

    return (
        <div className={classes.note}>
            <div className={classes.index}>
                {id}
            </div>
            <div className={classes.description}>
                {description}
            </div>
            <div className={classes.buttonContainer}>
                <Link href={`/${id}`} passHref>
                    <Button className={classes.button}>
                        <Create fontSize="inherit" />
                    </Button>
                </Link>
                <Button
                    color="secondary"
                    className={classes.button}
                    onClick={handleDeleteNote}
                >
                    <Delete fontSize="inherit" />
                </Button>
            </div>
        </div>
    );
};
