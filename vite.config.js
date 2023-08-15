import { resolve } from 'path';

export default {
    build: {
        type: ['es'],
        lib: {
            entry: resolve(__dirname, 'src/index.js'),
            name: 'PinturaPlugin',
            fileName: 'PinturaPlugin',
            formats: ['es'],
        },
        rollupOptions: {
            output: {
                globals: 'PinturaPlugin',
            },
        },
    },
};
