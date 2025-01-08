import { defineConfig } from 'vite';

export default defineConfig({
    resolve: {
        alias: {
            '~': '/src',
        },
    },
    server: {
        port: 4425
    }
})