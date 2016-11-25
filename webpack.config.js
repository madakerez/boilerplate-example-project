var path = require('path');
var webpack = require("webpack");

var ctxPath = path.resolve(__dirname, 'fe-src');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    context: ctxPath,
    entry: {
        'bundle': path.join(ctxPath, 'main.js')
    },
    output: {
        path: 'web/assets/scripts',
        publicPath: '/assets/scripts/',
        filename: '[name].js'
    },
    resolve: {
        root: ctxPath,
        alias: {
            "TweenLite": "gsap/src/uncompressed/TweenLite.js",
            "TweenMax": "gsap/src/uncompressed/TweenMax.js",
            "TimelineMax": "gsap/src/uncompressed/TimelineMax.js"
        }
    },
    module: {
        noParse: ['node_modules'],
        loaders: [
            {
                test: /\.less$/,
                loaders: ["style", "css", "autoprefixer?browsers=last 2 version", "less?strictMath"]
            },
            {
                test: /\.css$/,
                loaders: ["style", "css"]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.(jpg|jpeg|gif|png)$/,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[path]/[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};