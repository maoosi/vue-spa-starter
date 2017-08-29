var path = require('path')
var utils = require('./utils')
var config = require('./config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require('webpack')
var svgoConfig = require('./svgo.json')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        app: ['babel-polyfill', './src/main.js']
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath :
            config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        },
        symlinks: false
    },
    plugins: [
        new webpack.DefinePlugin({
            'env': config.env
        })
    ],
    module: {
        rules: [{
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolve('src'), resolve('test')],
                options: {
                    fix: process.env.ESLINT_FIX === 'true' ? true : false,
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.yml$/,
                loaders: ['json-loader', 'yaml-loader'],
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    resolve('src'), resolve('test'),
                    resolve('node_modules/autotrack'), resolve('node_modules/dom-utils')
                ],
                options: {
                    babelrc: false,
                    extends: resolve('.babelrc')
                }
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader'
                    },
                    {
                        loader: 'svgo-loader',
                        options: svgoConfig
                    }
                ],
                include: [resolve('static/svgsprite')]
            },
            {
                test: /\.svg$/,
                loader: 'svg-url-loader',
                options: {
                    limit: 1024,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                },
                exclude: [resolve('static/svgsprite'), resolve('src/assets/fonts')]
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                },
                include: [resolve('src/assets/fonts')]
            }
        ]
    }
}
