import { useRouter } from 'next/router';
import useSWR from 'swr';

import type { KeyedMutator } from 'swr';
import type { FetchNoteRes } from 'lib/api/routes/notes/fetch';

interface UseNoteResult {
    note?: FetchNoteRes;
    isLoading: boolean;
    mutate: KeyedMutator<FetchNoteRes>;
}

export const useNote = (): UseNoteResult => {
    const { query } = useRouter();

    const { data: note, error, mutate } = useSWR<FetchNoteRes>(
        typeof query.id === 'string' ? `/api/notes/${query.id}` : null,
        { revalidateOnMount: true },
    );

    return {
        note,
        isLoading: !error && !note,
        mutate,
    };
};
