import { resolve } from 'path';

export default {
    build: {
        type: ['es'],
        lib: {
            entry: resolve(__dirname, 'src/index.js'),
            name: 'PinturaEditor',
            fileName: 'PinturaEditor',
            formats: ['es'],
        },
        rollupOptions: {
            output: {
                globals: 'PinturaEditor',
            },
        },
    },
};
