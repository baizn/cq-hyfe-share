var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        './app/index.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    resolve: {
        //root: [ path.join(__dirname, 'app') ],
        extension: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    'env': {
                        'development': {
                            'presets': ['react-hmre', 'es2015', 'react']
                        }
                    }
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}