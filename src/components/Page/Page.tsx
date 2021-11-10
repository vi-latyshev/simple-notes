import { Container, makeStyles } from '@material-ui/core';

import { Footer } from 'components/Footer';

import { MetaTags } from './MetaTags';

import type { MetaTagsProps } from './MetaTags';

interface PageProps extends MetaTagsProps {
    title?: string;
    description?: string;
    children: NonNullable<React.ReactNode>;
}

const useStyles = makeStyles(({ palette }) => ({
    pageContainer: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: palette.common.white,
        height: '100vh',
        margin: '0 15px',
    },
    main: {
        margin: 15,
    },
}));

export const Page = ({ title, description, children }: PageProps) => {
    const classes = useStyles();

    return (
        <>
            <MetaTags title={title} description={description} />
            <Container disableGutters>
                <div className={classes.pageContainer}>
                    <main className={classes.main}>
                        {children}
                    </main>
                    <Footer />
                </div>
            </Container>
        </>
    );
};
