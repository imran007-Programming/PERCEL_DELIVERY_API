// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

// eslint.config.js or .eslintrc.js in flat config

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,

  // 🔧 Custom config to override or disable rules
  {
    rules: {
      // Disable rules you want to ignore
      'no-console': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  }
);
