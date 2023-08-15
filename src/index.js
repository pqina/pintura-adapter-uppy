import { UIPlugin } from '@uppy/core';

const createImageEditorQueue = (uppy, editorFactory, editorOptions) => {
    const queue = [];

    const editNextFile = () => {
        const next = queue[0];
        if (next) next();
    };

    const queueFile = (file) => {
        queue.push(function () {
            const editor = editorFactory({
                ...editorOptions,

                // file blob as src
                src: file.data,
            });

            editor.on('hide', () => {
                // Remove this item from the queue
                queue.shift();

                // Edit next item in queue
                editNextFile();
            });

            editor.on('processerror', console.log);

            editor.on('process', ({ dest }) => {
                // Don't add file if cancelled
                if (!dest) return;

                uppy.addFile({
                    // clone file
                    ...file,

                    // overwrite file data
                    data: dest,

                    // update metadata so we know this file was edited
                    meta: {
                        ...file.meta,
                        didEdit: true,
                    },
                });
            });
        });

        // If this is first item, let's open the editor immmidiately
        if (queue.length === 1) editNextFile();
    };

    return {
        canEditFile(file) {
            // Is remote file
            if (file.isRemote) return false;

            // Can only edit local file blobs
            if (!(file.data instanceof Blob)) return false;

            // Has to be a bitmap image
            return /^image/.test(file.type) && !/svg/.test(file.type);
        },
        didEditFile(file) {
            return !!file.meta.didEdit;
        },
        editFile(file) {
            queueFile(file);
        },
        destroy() {
            queue.length = 0;
        },
    };
};

export default class PinturaEditor extends UIPlugin {
    constructor(uppy, options) {
        super(uppy);

        this.id = 'PinturaEditor';
        this.type = 'editor';

        const { factory, options: editorOptions = {} } = options;

        // needs factory
        if (!factory) return;

        // can't have src
        delete editorOptions.src;

        this.factory = factory;
        this.options = editorOptions;

        // so scope is fixed
        this.didAddFile = (file) => this.onAddFile(file);
    }

    onAddFile(file) {
        if (this.editor.canEditFile(file) && !this.editor.didEditFile(file)) {
            this.uppy.removeFile(file.id);
            this.editor.editFile(file);
        }
    }

    install() {
        this.editor = createImageEditorQueue(this.uppy, this.factory, this.options);
        this.uppy.on('file-added', this.didAddFile);
    }

    uninstall() {
        this.editor.destroy();
        this.uppy.off('file-added', this.didAddFile);
    }
}
