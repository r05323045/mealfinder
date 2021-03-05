const path = require('path')
module.exports = {
  publicPath: '/',
  outputDir: path.resolve(__dirname, '../server/public'),
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '/api': {
        target: 'https://mealfinder2021.herokuapp.com'
      }
    }
  }
}
