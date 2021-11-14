import { makeStyles } from '@material-ui/core';
import useSWR from 'swr';

import { ListNoteItem } from './ListNoteItem';

import type { ListNotesRes } from 'lib/api/routes/notes/list';

const useStyles = makeStyles(() => ({
    notesContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: '30px 0',
    },
}));

export const ListNotesView = () => {
    const classes = useStyles();

    const { data } = useSWR<ListNotesRes>('/api/notes');

    const notes = data?.notes ?? [];
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
