'use strict'

const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.js');

// The development server
gulp.task('default', ['webpack-dev-server']);

// Production build
gulp.task('build', ['webpack:build']);


gulp.task('webpack:build', callback => {
    const config = Object.create(webpackConfig);

    config.plugins = config.plugins.concat(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );

    // run webpack
    webpack(config, (err, stats) => {
        if (err) {
            throw new gutil.PluginError('webpack:build', err);
        }
        gutil.log('[webpack:build]', stats.toString({
            colors: true,
        }));
        callback();
    });
});

gulp.task('webpack-dev-server', () => {
    // modify some webpack config options
    const config = Object.create(webpackConfig);
    const domain = 'localhost';
    const port = '8080';

    config.devtool = 'eval';
    config.debug = true;
    config.plugins = config.plugins || [];
    config.plugins.push(new webpack.DefinePlugin({
        __DEVELOPMENT__: true,
        __USE_MOCK__: !!process.env.USE_MOCK,
    }));

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(config), {
        contentBase: 'public',
        publicPath: '/static/scripts',
        historyApiFallback: true,
        quite: false,
        stats: {
            assets: false,
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false,
        },
    }).listen(port, domain, err => {
        if (err) {
            throw new gutil.PluginError('webpack-dev-server', err);
        }
        gutil.log('[webpack-dev-server]', 'http://localhost:8080/');
    });
});
