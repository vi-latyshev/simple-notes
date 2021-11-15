import { alpha, Container, makeStyles } from '@material-ui/core';
import { SWRConfig } from 'swr';

import { Footer } from 'components/Footer';

import { MetaTags } from './utils/MetaTags';

import type { NotesPageStaticProps } from 'lib/pages/notes';
import type { MetaTagsProps } from './utils/MetaTags';

export interface NotesPageProps extends NotesPageStaticProps {
    meta?: MetaTagsProps;
    children: NonNullable<React.ReactNode>;
}

const useStyles = makeStyles(({ palette }) => ({
    pageContainer: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: palette.common.white,
        height: '100vh',
        boxShadow: `0px 10px 20px ${alpha(palette.divider, 0.07)}`,
    },
    page: {
        margin: 20,
    },
}));

export const NotesPage = ({
    meta,
    swrFallback,
    children,
}: NotesPageProps) => {
    const classes = useStyles();

    return (
        <SWRConfig value={{ fallback: swrFallback }}>
            <MetaTags {...meta} />
            <Container disableGutters className={classes.pageContainer}>
                <div className={classes.page}>
                    {children}
                </div>
                <Footer />
            </Container>
        </SWRConfig>
    );
};
