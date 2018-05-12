const path = require('path');

const isProd = !process.argv.some((arg) => arg === '-p');

const DIST_NAME = 'dist';

module.exports = ({ isStoryBook, dirname = __dirname } = {}) => {
    return {
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
                    use: 'awesome-typescript-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.p?css$/,
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
                                localIdentName: isProd && !isStoryBook ? '[hash:base64:6]' : '[path][name]---[local]',
                                minimize: true
                            }
                        },
                        'postcss-loader'
                    ]
                },
                {
                    test: /\.svg$/,
                    use: 'svg-react-loader'
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(dirname, DIST_NAME)
        }
    }
};
