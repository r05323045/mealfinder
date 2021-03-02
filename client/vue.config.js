module.exports = {
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '/api': {
        target: 'https://mealfirst.herokuapp.com/'
      }
    }
  }
}
