const path = require('path')
module.exports = {
  publicPath: '/',
  outputDir: path.resolve(__dirname, '../server/public'),
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '/api': {
        target: 'https://mealfinder-server.vercel.app'
      }
    }
  }
}
