import { useCallback } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { useNotesList } from 'hooks/useNotesList';
import { InputText } from 'components/controls';

import type { Note, NoteData } from 'types/note';
import type { CreateNoteRes } from 'lib/api/routes/notes/create';

export interface AddNoteModalViewProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AddNoteModalView = ({
    isOpen,
    onClose,
}: AddNoteModalViewProps) => {
    const { notes, mutate } = useNotesList();

    const {
        reset,
        control,
        trigger,
        formState,
        getValues,
    } = useForm<NoteData>();

    const handleClose: AddNoteModalViewProps['onClose'] = useCallback(() => {
        reset();
        onClose();
    }, []);

    const handleAdd = useCallback(async () => {
        const isValid = await trigger();

        if (!isValid) {
            return;
        }
        const values = getValues();

        const newNote: Note = {
            id: String(notes.length + 1),
            ...values,
        };
        mutate([...notes, newNote], false);

        const resp = await axios.post<CreateNoteRes>('/api/notes', values);
        const { data: respNewNote } = resp;
        // @TODO FIX IT
        mutate([...notes, respNewNote], false);

        handleClose();
    }, []);

    return (
        <Dialog
            fullWidth
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="add-note"
        >
            <DialogTitle id="add-note">Добавить задачу</DialogTitle>
            <DialogContent>
                <InputText
                    control={control}
                    label="Краткое описание"
                    name="description"
                    rules={{ required: 'Заголовок не может быть пустым' }}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant="text"
                    onClick={handleAdd}
                    disabled={!formState.isDirty}
                >
                    Добавить
                </Button>
            </DialogActions>
        </Dialog>
    );
};
