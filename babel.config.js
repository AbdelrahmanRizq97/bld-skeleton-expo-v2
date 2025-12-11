require('dotenv').config();

const inlineEnvVars = Object.keys(process.env).filter((key) => key.startsWith('EXPO_PUBLIC_'));

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
      ['transform-inline-environment-variables', { include: inlineEnvVars }],
      'react-native-reanimated/plugin',
    ],
  };
};

