const path = require("path");
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackNotifierPlugin = require('webpack-notifier');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = "style-loader";

const config = {
    entry: ['./scripts/js/app.js', './styles/scss/index.scss'],
    output: {
        filename: './scripts/js/app.min.js',
        path: path.resolve(__dirname)
    },
    devServer: {
        open: true,
        host: "localhost",
    },
    plugins: [
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({ filename: './styles/css/index.min.css' }),
        new WebpackNotifierPlugin({ alwaysNotify: true }),
        new FriendlyErrorsWebpackPlugin({
            clearConsole: false,
        }),
    ],
    stats: 'errors-only',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: "babel-loader",
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, stylesHandler, "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [stylesHandler, "css-loader", "sass-loader"],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: "asset",
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = "production";
    } else {
        config.mode = "development";
    }
    return config;
};
