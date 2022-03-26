/* HELPFUL WEBPACK SETUP RESOURCES (note some options in the example may be depricated or have changed):
https://linguinecode.com/post/how-to-setup-webpack-dev-server-react-babel
https://dev.to/riddhiagrawal001/create-react-app-without-create-react-app-2lgd
*/

const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, './client'),
      publicPath: '/',
    },
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) throw new Error('webpack-dev-server undefined');

      devServer.app.get('/coffeeShop', (_, response) => {
        response.send('setup-middlewares option GET');
      });

      
      devServer.app.post('/coffeeShop', (_, response) => {
        response.send('setup-middlewares option POST');
      });

      return middlewares;
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      // this injects a script tag in the html
      // in production, we can manually write <script src="build/bundle.js"></script>
      // but in development, we're not using express so that won't work
      inject: true,
      template: path.resolve(__dirname, 'client/index.html'),
    }),
  ],
  module: {
    
    rules: [
      {
        test: /\.jsx?/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: [ 
          "style-loader",
          "css-loader",
        ]
    }
    ]
  }
}