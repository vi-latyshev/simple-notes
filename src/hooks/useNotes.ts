import useSWR from 'swr';

import type { ListNotesRes } from 'lib/api/routes/notes/list';

interface UseNotesListResult extends ListNotesRes {
    isLoading: boolean;
}

export const useNotesList = (fallbackData?: ListNotesRes): UseNotesListResult => {
    const { data, error } = useSWR<ListNotesRes>('/api/notes', { fallbackData });

    return {
        notes: data?.notes ?? [],
        isLoading: !error && !data,
    };
};
