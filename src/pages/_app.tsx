import { useEffect } from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { SWRConfig } from 'swr';

import { theme } from 'styles';
import { fetcher } from 'utils/fetcher';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        jssStyles?.parentElement?.removeChild(jssStyles);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <SWRConfig
                value={{
                    fetcher,
                    errorRetryCount: 3,
                    focusThrottleInterval: 10000,
                }}
            >
                <CssBaseline />
                <Component {...pageProps} />
            </SWRConfig>
        </ThemeProvider>
    );
}
export default MyApp;
