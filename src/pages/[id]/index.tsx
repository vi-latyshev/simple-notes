import { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, makeStyles } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useForm } from 'react-hook-form';

import { Header } from 'components/Header';
import { Page } from 'components/Page';
import { InputText } from 'components/controls';

import type { NoteBase } from 'types/note';

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

export const NotePage = () => {
    const classes = useStyles();
    const route = useRouter();

    const { control, trigger, formState } = useForm<NoteBase>();

    const handleRemoveNote = useCallback(async () => {
        route.push('/');
    }, []);

    const handleChangeNote = useCallback(async () => {
        const isValid = await trigger();

        if (!isValid) {
            return;
        }

        route.push('/');
    }, []);

    return (
        <Page>
            <Header title={`Задача №${1}`}>
                <Button
                    color="secondary"
                    endIcon={(
                        <Delete fontSize="inherit" />
                    )}
                    onClick={handleRemoveNote}
                >
                    Удалить
                </Button>
            </Header>
            <main className={classes.noteContainer}>
                <InputText
                    defaultValue="test"
                    control={control}
                    label="Краткое описание"
                    name="description"
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
            </main>
        </Page>
    );
};

export default NotePage;
