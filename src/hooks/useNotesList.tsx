import useSWR from 'swr';

import type { KeyedMutator } from 'swr';
import type { ListNotesRes } from 'lib/api/routes/notes/list';

interface UseNotesListResult {
    notes: ListNotesRes;
    isLoading: boolean;
    mutate: KeyedMutator<ListNotesRes>;
}

export const useNotesList = (): UseNotesListResult => {
    const { data, error, mutate } = useSWR<ListNotesRes>('/api/notes');

    return {
        notes: data ?? [],
        isLoading: !error && !data,
        mutate,
    };
};
