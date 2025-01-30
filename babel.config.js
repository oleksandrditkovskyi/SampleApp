module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
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
