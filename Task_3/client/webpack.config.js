const path = require('path');

module.exports = {
  // Your existing webpack configuration here, add or adjust as needed to merge below
  output: {
    publicPath: '/',
  },
  module: {
    rules: [
      // Other rules you may have
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [
          /node_modules[\\/]face-api.js/
        ],
      },
    ],
  },
  // Other config options...
};
