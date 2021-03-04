const path = require('path')
module.exports = {
  publicPath: '/mealfinder/',
  outputDir: path.resolve(__dirname, '../server/public'),
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' }
  }
}
