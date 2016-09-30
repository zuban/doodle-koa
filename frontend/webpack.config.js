const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        index: './src/routes.js',
    },
    output: {
        publicPath: '/public//static/scripts',
        path: path.join(__dirname, 'public/static/scripts'),
        filename: 'bundle.js',
    },
    target: 'web',
    resolve: {
        modulesDirectories: ['node_modules'],
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react', 'stage-2'],
                },
            },
        ],
    },
    externals: {
        react: 'React',
        redux: 'Redux',
        'react-dom': 'ReactDOM',
        'react-redux': 'ReactRedux',
    },
    node: {
        fs: 'empty',
    },
};
