const path = require('path')
module.exports = {
  publicPath: '/',
  outputDir: path.resolve(__dirname, '/dist'),
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '/api': {
        target: 'https://mealfinder-server.vercel.app'
      }
    }
  }
}
