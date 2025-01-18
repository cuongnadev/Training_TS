import { defineConfig } from 'vite';

export default defineConfig({
    resolve: {
        alias: {
            '~': '/src',
        },
    },
    server: {
        host: '0.0.0.0',
        port: 4425
    },
    build: {
        target: 'esnext',
    },
})