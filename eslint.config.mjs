import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
    // Global environment configuration
    {
        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },
    },
    // Eslint configuration
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.stylistic,
    // Ignore patterns
    {
        ignores: ['./public/dist/*'],
    }
);
