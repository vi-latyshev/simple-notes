import useSWR, { KeyedMutator } from 'swr';

import type { ListNotesRes } from 'lib/api/routes/notes/list';

interface UseNotesList {
    notes: ListNotesRes;
    isLoading: boolean;
    mutate: KeyedMutator<ListNotesRes>;
}

export const useNotesList = (): UseNotesList => {
    const { data, error, mutate } = useSWR<ListNotesRes>('/api/notes');

    return {
        notes: data ?? [],
        isLoading: !error && !data,
        mutate,
    };
};
