const ReactCompilerConfig = {
  target: '18',
};

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['babel-plugin-react-compiler', ReactCompilerConfig],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@assets': './src/assets',
          '@services': './src/services',
          '@utils': './src/utils',
          '@store': './src/store',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      { moduleName: '@env', path: '.env', allowUndefined: true },
    ],
    ['react-native-reanimated/plugin'],
  ],
};
