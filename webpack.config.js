var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './server/app.js',
    output: {
        path: './build',
        filename: 'server.js',
    },
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                plugins: ['transform-async-to-generator', 'syntax-async-functions'],
                presets: ['es2015-node5'],
            }
        }]
    }
}
