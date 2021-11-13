import { useCallback } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';

import { InputText } from 'components/controls';

import type { Note } from 'types/note';

export interface AddNoteDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (values: Note) => void;
}

export const AddNoteDialog = ({
    isOpen,
    onAdd,
    onClose,
}: AddNoteDialogProps) => {
    const {
        reset,
        control,
        trigger,
        formState,
        getValues,
    } = useForm<Note>({
        mode: 'all',
    });

    const handleClose: AddNoteDialogProps['onClose'] = useCallback(() => {
        reset();
        onClose();
    }, [reset, onClose]);

    const handleAdd = useCallback(async () => {
        const isValid = await trigger();

        if (!isValid) {
            return;
        }
        const values = getValues();

        onAdd(values);
        handleClose();
    }, [onAdd, trigger, getValues, handleClose]);

    return (
        <Dialog
            fullWidth
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="add-note"
        >
            <DialogTitle id="add-note">Добавить задачу</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Краткое описание
                </DialogContentText>
                <InputText
                    control={control}
                    label="Описание"
                    name="description"
                    rules={{ required: 'Заголовок не может быть пустым' }}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    color="primary"
                    onClick={handleAdd}
                    disabled={!formState.isDirty}
                >
                    Добавить
                </Button>
            </DialogActions>
        </Dialog>
    );
};
