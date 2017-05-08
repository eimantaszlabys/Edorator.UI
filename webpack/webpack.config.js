const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (options) => {
    const ExtractSASS = new ExtractTextPlugin(`/styles/${options.cssFileName}`);

    const webpackConfig = {
        devtool: options.devtool,
        entry: {
            index: [
                Path.join(__dirname, '../src/app/index'),
            ],
        },

        output: {
            path: Path.join(__dirname, '../dist'),
            filename: `scripts/${options.jsFileName}`,
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        module: {
            rules: [
                {
                    test: /.(jsx|js)?$/,
                    include: Path.join(__dirname, '../src/app'),
                    use: 'babel-loader',
                },
                {
                   test: /\.scss$/,
                        use: [{
                            loader: "style-loader" // creates style nodes from JS strings
                        }, {
                            loader: "css-loader" // translates CSS into CommonJS
                        }, {
                            loader: "sass-loader" // compiles Sass to CSS
                        }]
                },                
                {
                    test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
                    use: 'file-loader?name=/fonts/[name].[ext]'
                },
                {
                    test: /\.(jpe?g|png|gif|svg|ico)$/i,
                    include: /src/,
                    use: 'file-loader?name=/images/[sha512:hash:base64:7].[ext]'

                },
            ]
        },
        plugins: [
            new Webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(options.isProduction ? 'production' : 'development')
                },
            }),
            new HtmlWebpackPlugin({
                template: Path.join(__dirname, '../src/index.html')
            })
        ],
    };

    if (options.isProduction) {
        webpackConfig.plugins.push(
            new Webpack.optimize.UglifyJsPlugin({
                compressor: {
                    warnings: false,
                },
            }),
            ExtractSASS
        );
    } else {
        webpackConfig.plugins.push(
            new Webpack.HotModuleReplacementPlugin(),
            ExtractSASS
        );

        webpackConfig.devServer = {
            contentBase: Path.join(__dirname, '../'),
            port: options.port,
            inline: true,
            historyApiFallback: true,
        };
    }

    return webpackConfig;
};