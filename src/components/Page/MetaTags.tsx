import Head from 'next/head';
import { useRouter } from 'next/router';

export interface MetaTagsProps {
    title?: string;
    description?: string;
}

const DEFAULT_TITLE = 'Notes';
const DEFAULT_DESCRIPTION = 'Simple notes';
const KEYWORDS = ['notes', 'simple notes'].join(', ');

const DOMAIN_URL = process.env.DOMAIN;

export const MetaTags = ({
    title = DEFAULT_TITLE,
    description = DEFAULT_DESCRIPTION,
}: MetaTagsProps) => {
    const { pathname } = useRouter();

    return (
        <Head>
            {/* required */}
            <meta key="charSet" charSet="utf-8" />

            <title>{title}</title>

            {/* Primary */}
            <meta name="description" content={description} />
            {/* required meta tags */}
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <meta name="keywords" content={KEYWORDS} />
            <meta name="url" content={`${DOMAIN_URL}${pathname}`} />

            {/* Open Graph / Facebook */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:locale" content="ru_RU" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN_URL}${pathname}`} />
            <meta property="og:image" content={`${DOMAIN_URL}/favicon.ico`} />

            {/* Twitter */}
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:url" content={`${DOMAIN_URL}${pathname}`} />
            <meta name="twitter:image" content={`${DOMAIN_URL}/favicon.ico`} />

            {/* icons */}
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        </Head>
    );
};
