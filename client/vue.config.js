module.exports = {
  publicPath: '/',
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '/api': {
        target: 'https://mealfinder-server.vercel.app'
      }
    }
  }
}
