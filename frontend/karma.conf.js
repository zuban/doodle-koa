// Karma configuration
// Generated on Thu Aug 04 2016 10:42:34 GMT+0700 (RTZ 6 (зима))
'use strict';
const webpack = require('webpack');

module.exports = function (config) {
    let files = [];

    // Добавить бибилиотеки в контекст выполнения
    [
        'public/static/scripts/vendor/react-with-addons.min.js',
        'public/static/scripts/vendor/react-dom.min.js',
        'public/static/scripts/vendor/redux.min.js',
        'public/static/scripts/vendor/react-redux.min.js',
        'public/static/scripts/vendor/lodash.min.js',
    ].forEach(library => files.push({pattern: library, watched: false}));

    // Выполнять тесты, указанные в переменной окружения TEST.
    // Под CI и в продакшн-режиме выполнять все тесты.
    // Иначе выполнять основные тесты из tests.webpack.js
    if (process.env.TEST) {
        files.push(process.env.TEST);
    } else if (process.env.CI || process.env.PRODUCTION) {
        files.push('src/**/__test__/**/*-test.js');
    } else {
        files.push('./tests.webpack.js');
    }

    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha'],

        // list of files / patterns to load in the browser
        files,

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'tests.webpack.js': ['webpack', 'sourcemap'],
            'src/**/__test__/**/*-test.js': ['webpack', 'sourcemap'],
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
        // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        plugins: [
            require('karma-webpack'),
            require('karma-mocha'),
            require('karma-mocha-reporter'),
            require('karma-chrome-launcher'),
            require('karma-sourcemap-loader'),
        ],

        webpack: { // kind of a copy of your webpack config
            devtool: 'inline-source-map', // just do inline source maps instead of the default
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel',
                        query: {
                            presets: ['es2015', 'react', 'stage-2'],
                        },
                    },
                ],
            },
            externals: {
                react: 'React',
                'react-dom': 'ReactDOM',
                redux: 'Redux',
                'react-redux': 'ReactRedux',
                lodash: '_',
                cheerio: 'window',
                'react/addons': true,
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true,
            },
            plugins: [
                new webpack.DefinePlugin({
                    __DEVELOPMENT__: true,
                    __USE_MOCK__: !!process.env.USE_MOCK,
                }),
            ],
            node: {
                fs: 'empty',
            },
        },

        webpackServer: {
            noInfo: true,
            stats: 'errors-only',
        },
    });
};
