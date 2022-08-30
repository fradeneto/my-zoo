const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/main/index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main-bundle-[contenthash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', 'scss'],
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }, 
    {
      test: /\.(js|jsx)$/i,
      exclude: /node_modules/,
      loader: 'ts-loader',
    },
    {
      test: /\.(png|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
    }, 
    {
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    },
    {
      test: /\.(scss|css)$/,
      use: [
        {
          loader: 'style-loader'
        }, 
        {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }, 
        {
          loader: 'sass-loader'
        }
      ]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),
  ]
}