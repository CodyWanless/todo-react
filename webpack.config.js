const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'development') {
    // require('dotenv').config({ path: '.env.development' });
} else if (process.env.NODE_ENV === 'test') {
    // require('dotenv').config({ path: '.env.test' });
}

const publicPath = path.join(__dirname, 'public');
module.exports = (env, argv) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return {
        entry: ['babel-polyfill', './src/index.js'],
        output: {
            path: path.join(publicPath, 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{ // run babel when a js file is encountered outside of node_modules/
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                use: CSSExtract.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                    ]
                }),
                test: /\.s?css$/
            }]
        },
        plugins: [
            CSSExtract
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: publicPath,
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    };
};