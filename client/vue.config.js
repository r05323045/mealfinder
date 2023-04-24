const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

module.exports = {
  publicPath: '/',
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '/api': {
        target: 'https://mealfinder-server.vercel.app'
      }
    }
  },
  configureWebpack (config) {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new PrerenderSPAPlugin({
          staticDir: path.join(__dirname, 'dist'),
          routes: [
            '/',
            '/about',
            '/restaurants',
            '/map',
            '/booking',
            '/booking/success',
            '/coupons',
            '/signin',
            '/signup'
          ],
          renderer: new Renderer({
            renderAfterDocumentEvent: 'render-event'
          })
        })
      )
    }
  }
}
