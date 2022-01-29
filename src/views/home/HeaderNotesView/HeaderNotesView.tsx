import { useCallback, useState } from 'react';
import { Button } from '@material-ui/core';

import { Header } from 'components/Header';

import { AddNoteModalView } from './AddNoteDialog';

export const HeaderNotesView = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenAddNote = useCallback(() => {
        setIsOpen(true);
    }, []);

    const handleCloseAddNote = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <>
            <Header title="Список задач">
                <Button onClick={handleOpenAddNote}>
                    Добавить
                </Button>
            </Header>
            <AddNoteModalView
                isOpen={isOpen}
                onClose={handleCloseAddNote}
            />
        </>
    );
};
