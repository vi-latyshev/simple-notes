import { useEffect } from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

import { theme } from 'styles';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        jssStyles?.parentElement?.removeChild(jssStyles);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
export default MyApp;
