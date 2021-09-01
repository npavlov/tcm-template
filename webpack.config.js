const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {

    const buildMode = env.mode;

    const isDev = buildMode === 'development';

    console.log(buildMode)

    return {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
        },
        mode: buildMode,
        module: {
            rules: [
                {
                    test: /\.[jt]sx?$/,
                    use: ['babel-loader'],
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: [(isDev ? 'style-loader' : MiniCssExtractPlugin.loader), {
                        loader: "css-loader",
                        options: {
                            modules: true,
                        },
                    }, {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        }
                    }],
                },
                {
                    test: /\.scss$/,
                    use: ['style-loader', {
                        loader: "css-loader",
                        options: {
                            modules: true,
                        },
                    }, 'sass-loader'],
                },
                {
                    test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                    type: 'asset/inline',
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.jsx'],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, './src/index.html'),
            }),
            new CleanWebpackPlugin(),
            ...(isDev ? [] : [
                new MiniCssExtractPlugin({
                    filename: '[name].[contenthash].css',
                    chunkFilename: '[name].[contenthash].css',
                }),
            ]),
        ],
        devServer: {
            static: path.join(__dirname, './src'),
            port: 3000,
            hot: true,
            compress: true,
            open: true,
        },
    }
}