import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlPlugin from 'html-webpack-plugin';
import HappyPack from 'happypack';
import {TsconfigPathsPlugin} from 'tsconfig-paths-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {HotModuleReplacementPlugin} from 'webpack';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import Sass from "sass";
import Fiber from "fibers";

const isDev = (mode) => mode === 'development';

const config = {
    path: `${__dirname}/dist`,
    clean: {
        root: __dirname,
        verbose: true,
        dry: false
    },
    htmlPlugin: {
        filename: 'index.html',
        inject: 'body',
        template: `${__dirname}/public/index.html`,
    },
    css: {
        src: path.join(__dirname, 'src', 'scss'),
        allChunks: true,
        publicPath: 'css',
    },
};

export default (env = {}, {mode}) => {
    const {PORT = 3000} = env;
    return {
        devtool: 'source-map',
        optimization: {
            namedModules: true, // NamedModulesPlugin()
            noEmitOnErrors: true, // NoEmitOnErrorsPlugin
        },
        entry: {
            "react-hot-loader/patch": isDev(mode) && "react-hot-loader/patch",
            "webpack-dev-server/client?http://localhost:3000": isDev(mode) && "webpack-dev-server/client?http://localhost:3000",
            "webpack/hot/only-dev-server": isDev(mode) && "webpack/hot/only-dev-server",
            vendor: [
                '@babel/polyfill',
                'react',
                'react-dom',
                'classnames',
                'react-redux',
                'redux',
                'react-router',
            ],
            bundle: "./src/js/index.tsx",
        },
        output: {
            path: config.path,
            filename: isDev(mode) ? 'js/[name].js' : 'js/[name].[hash].js',
            chunkFilename: isDev(mode) ? 'js/[name].bundle.js' : 'js/[name].bundle.[chunkhash].js',
            publicPath: ""
        },
        resolve: {
            extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
            plugins: [
                new TsconfigPathsPlugin(),
            ],
            alias: {
                'images': path.join(__dirname, 'src', 'images'),
            }
        },
        module: {
            rules: [
                {
                    test: /\.(js|ts)x?$/,
                    exclude: /node_modules\/(?!.*react-spring.*$)/,
                    loader: 'happypack/loader?id=ts',
                },
                {
                    test: /\.(css|s[ca]ss)$/,
                    use: [
                        'css-hot-loader',
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 2,
                                import: true,
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins() {
                                    return [
                                        precss,
                                        autoprefixer([
                                            '> 1%',
                                            'ie 10',
                                            'iOS >=5',
                                        ]),
                                    ];
                                },
                                options: {
                                    sourceMap: true,
                                }
                            },
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                implementation: Sass,
                                fiber: Fiber,
                                sourceMap: true,
                            }
                        },
                    ],
                },
                {
                    test: /.*\.(ttf|eot|svg|woff|woff2|png|ico|jpg|jpeg|gif)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: isDev(mode) ?
                                    '[path][name].[ext]' :
                                    '[path][name].[hash].[ext]',
                                publicPath: '/'
                            }
                        },
                    ],
                }
            ],
        },
        plugins: [
            new CleanWebpackPlugin(config.path, config.clean),
            new HotModuleReplacementPlugin(),
            new MiniCssExtractPlugin({
                ...config.css,
                filename: 'css/[name].css'
                // filename: isDev(mode) ?
                //     'css/[name].css' :
                //     'css/[name].[chunkhash].css',
            }),
            // TODO убрать когда примут https://github.com/webpack-contrib/mini-css-extract-plugin/pull/225
            new class {
                apply(compiler) {
                    compiler.hooks.thisCompilation.tap("mini-css-extract-plugin", compilation => {
                        compilation.mainTemplate.hooks.renderManifest.tap("mini-css-extract-plugin", (result, { chunk }) => {
                            const modules = Array.from(chunk.modulesIterable).filter(({ type }) => type === 'css/mini-extract');
                            if(modules.length > 0) {
                                const [{ issuer: { id = "null" } }] = modules;
                                result[0].filenameTemplate = isDev(mode) || ["aui", "main"].some((name) => id.includes(name)) ?
                                    'css/[name].css' :
                                    'css/[name].[chunkhash].css';
                            }
                        });
                    });
                }
            },
            new HappyPack({
                id: 'ts',
                threads: 4,
                verbose: false,
                loaders: [
                    {
                        path: 'babel-loader',
                    },
                ]
            }),
            
            new HtmlPlugin(config.htmlPlugin),
        ].filter((plugin) => !!plugin),
        devServer: isDev(mode) && {
            port: PORT,
            contentBase: path.join(__dirname, 'dist'),
            hot: true,
            historyApiFallback: true,
            writeToDisk: true,
        },
    };
};
