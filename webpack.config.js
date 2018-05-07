const path = require('path');

const DIST_NAME = 'dist';

module.exports = {
    entry: './src/index.tsx',
    performance: {
        hints: false
    },
    devServer: {
        // contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 8200,
        compress: true,
        publicPath: `/${DIST_NAME}/`,
        overlay: true
      },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            singleton: true
                        }
                    },
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            namedExport: true,
                            modules: true,
                            importLoaders: 1,
                            // localIdentName: isProd ? '[hash:base64:6]' : '[path][name]---[local]',
                            minimize: true
                        }
                    },
                    'postcss-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, DIST_NAME)
    }
};
