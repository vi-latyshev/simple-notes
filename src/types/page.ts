interface SWRFallback<T> {
    [apiEndpoint: string]: T;
}

export interface NextPageProps<T = unknown> {
    swrFallback?: SWRFallback<T>;
}
