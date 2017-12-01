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
        entry: './src/index.tsx',
        output: {
            path: path.join(publicPath, 'dist'),
            filename: 'bundle.js'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },
        module: {
            rules: [{
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
            }, {
                test: /\.(t|j)sx?$/,
                use: { loader: 'awesome-typescript-loader' },
                exclude: /node_modules/
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