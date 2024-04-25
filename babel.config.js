module.exports = {
  presets: ['react-app', '@emotion/babel-preset-css-prop'],
  plugins: [
    ['module-resolver', {
      root: [
        './src',
      ],
    },
    ],
  ],
};
