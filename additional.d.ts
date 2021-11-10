declare namespace NodeJS {
    interface ProcessEnv {
        // next.config.js
        readonly HOST: string;
        readonly DOMAIN: string;
    }
}
