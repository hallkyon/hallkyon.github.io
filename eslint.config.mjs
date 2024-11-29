import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        languageOptions: {
            globals: globals.browser,
        },
        rules: {
            complexity: ['error', { max: 2 }],
            eqeqeq: ['error', 'always', { null: 'always' }],
        },
    },
    pluginJs.configs.recommended,
];
