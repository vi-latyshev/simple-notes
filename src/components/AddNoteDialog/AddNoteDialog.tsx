import { useCallback } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';

import { InputText } from 'components/controls';

import type { NoteData } from 'types/note';

export interface AddNoteDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AddNoteDialog = ({
    isOpen,
    onClose,
}: AddNoteDialogProps) => {
    const {
        reset,
        control,
        trigger,
        formState,
        getValues,
    } = useForm<NoteData>();

    const handleClose: AddNoteDialogProps['onClose'] = useCallback(() => {
        reset();
        onClose();
    }, []);

    const handleAdd = useCallback(async () => {
        const isValid = await trigger();

        if (!isValid) {
            return;
        }
        const values = getValues();

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
