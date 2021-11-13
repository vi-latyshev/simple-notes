const LOCAL_URL = 'localhost';
// eslint-disable-next-line prefer-destructuring
const VERCEL_URL = process.env.VERCEL_URL;

/** @type {import('next').NextConfig} */
module.exports = {
    eslint: {
        dirs: [
            'src',
        ],
    },
    env: {
        HOST: VERCEL_URL ?? LOCAL_URL,
        DOMAIN: VERCEL_URL ? `https://${VERCEL_URL}` : `http://${LOCAL_URL}:3000`,
    },
};
