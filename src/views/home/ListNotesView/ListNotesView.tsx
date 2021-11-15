import { makeStyles } from '@material-ui/core';

import { useNotesList } from 'hooks/useNotesList';

import { ListNoteItem } from './ListNoteItem';

const useStyles = makeStyles(() => ({
    notesContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: '30px 0',
    },
}));

export const ListNotesView = () => {
    const classes = useStyles();

    const { notes } = useNotesList();

    const hasNotes = notes.length > 0;

    return (
        <main className={classes.notesContainer}>
            {hasNotes && (
                notes.map((note) => (
                    <ListNoteItem
                        key={note.id}
                        {...note}
                    />
                ))
            )}
            {!hasNotes && 'н/д'}
        </main>
    );
};
