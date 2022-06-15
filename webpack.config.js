
const path = require('path');

module.exports = {
    entry: {
      main: path.resolve(__dirname, './src/app.js'),
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
//        {
//            test: /\.jsx$/,
//            loader: 'babel-loader',
//            exclude: /node_modules/,
//            include: path.join(__dirname, '/pascal.js'),
//        },
        {
            test: /\.s[ac]ss$/i,
            use: [
              // Creates `style` nodes from JS strings
              "style-loader",
              // Translates CSS into CommonJS
              "css-loader",
              // Compiles Sass to CSS
              "sass-loader",
            ],
       },
      ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js'],
        alias: {
          xyz$: path.resolve(__dirname, 'path/to/file.js')
        },
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'deploy')
    },
};
