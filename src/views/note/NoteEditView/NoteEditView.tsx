import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button, makeStyles } from '@material-ui/core';
import { useForm } from 'react-hook-form';

import { useNote } from 'hooks/useNote';

import type { NoteData } from 'types/note';
import { InputText } from 'components/controls';

const useStyles = makeStyles(() => ({
    noteContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        margin: '30px 0',
        '& > *:not(:first-child)': {
            marginTop: 15,
        },
    },
}));

export const NoteEditView = () => {
    const classes = useStyles();

    const route = useRouter();
    const { note } = useNote();

    const { control, trigger, formState } = useForm<NoteData>();

    const handleChangeNote = useCallback(async () => {
        const isValid = await trigger();

        if (!isValid) {
            return;
        }
        route.push('/');
    }, []);

    return (
        <main className={classes.noteContainer}>
            {note && (
                <>
                    <InputText
                        control={control}
                        name="description"
                        label="Краткое описание"
                        defaultValue={note.description}
                        rules={{ required: 'Заголовок не может быть пустым' }}
                    />
                    {formState.isDirty ? (
                        <Button onClick={handleChangeNote}>
                            Сохранить
                        </Button>
                    ) : (
                        <Link href="/" passHref>
                            <Button>
                                Вернуться к списку
                            </Button>
                        </Link>
                    )}
                </>
            )}
        </main>
    );
};
