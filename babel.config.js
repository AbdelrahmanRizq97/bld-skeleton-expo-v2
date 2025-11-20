/**
 * ⚠️ CRITICAL: DO NOT MODIFY THIS FILE ⚠️
 * 
 * This file is a core configuration file required for the build system.
 * Any changes to this file may break the build, module resolution, or NativeWind integration.
 * LLMs should NEVER attempt to modify, refactor, or "improve" this file.
 * 
 * This file is managed externally and should remain unchanged.
 */

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@': './',
          },
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        },
      ],
    ],
  };
};
