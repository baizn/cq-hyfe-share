var webpack = require('webpack')
var webpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config')
var port = 3000

new webpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    compress: true,
    stats: {
        colors: true,
        hash: true,
        timings: true,
        chunks: false
    }
}).listen(port, 'localhost', function(err) {
    if(err) {
        console.log(err)
    }

    console.log('webpack dev server is listening at localhost:' + port)
})