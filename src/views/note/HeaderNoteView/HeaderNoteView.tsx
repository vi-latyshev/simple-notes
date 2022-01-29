import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import axios from 'axios';

import { Header } from 'components/Header';
import { useNote } from 'hooks/useNote';

import type { DeleteNoteRes } from 'lib/api/routes/notes/detele';

export const HeaderNoteView = () => {
    const route = useRouter();
    const { note } = useNote();

    const handleDeleteNote = useCallback(async () => {
        if (note === undefined) {
            return;
        }
        await axios.delete<DeleteNoteRes>(`/api/notes/${note.id}`);

        route.push('/');
    }, [note]);

    return (
        <Header title={note ? `Задача №${note.id}` : 'Загрузка'}>
            {note && (
                <Button
                    color="secondary"
                    endIcon={(
                        <Delete fontSize="inherit" />
                    )}
                    onClick={handleDeleteNote}
                >
                    Удалить
                </Button>
            )}
        </Header>
    );
};
