import axios from 'axios';

import type { AxiosError } from 'axios';

interface APIErrorJSON {
    error: string;
    code: number;
}

export const fetcher = async <T extends Object>(url: string): Promise<T> => {
    try {
        const resp = await axios.get<T>(url);

        return resp.data;
    } catch (e) {
        const error = e as AxiosError<APIErrorJSON>;

        if (error?.response) {
            throw Error(`API (${url}) responded with error: ${error.response.data.error}`);
        }
        if (error?.request) {
            throw Error(`API (${url}) did not respond.`);
        }
        throw Error(`${e.name} calling API (${url}): ${e.message}`);
    }
};
