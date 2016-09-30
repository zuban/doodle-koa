/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _koa = __webpack_require__(1);

	var _koa2 = _interopRequireDefault(_koa);

	var _koaRouter = __webpack_require__(2);

	var _koaRouter2 = _interopRequireDefault(_koaRouter);

	var _json = __webpack_require__(3);

	var _nodeUuid = __webpack_require__(5);

	var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

	var _koaBodyparser = __webpack_require__(6);

	var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

	var _koaLogger = __webpack_require__(7);

	var _koaLogger2 = _interopRequireDefault(_koaLogger);

	var _koaConvert = __webpack_require__(8);

	var _koaConvert2 = _interopRequireDefault(_koaConvert);

	var _koaStatic = __webpack_require__(9);

	var _koaStatic2 = _interopRequireDefault(_koaStatic);

	var _koaSend = __webpack_require__(10);

	var _koaSend2 = _interopRequireDefault(_koaSend);

	var _koaCors = __webpack_require__(11);

	var _koaCors2 = _interopRequireDefault(_koaCors);

	var _koaHistoryApiFallback = __webpack_require__(12);

	var _koaHistoryApiFallback2 = _interopRequireDefault(_koaHistoryApiFallback);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

	const router = new _koaRouter2.default();
	const app = new _koa2.default();

	app.use((0, _koaLogger2.default)());
	app.use((0, _koaBodyparser2.default)());

	const daydiff = (date1, date2) => {

	    // The number of milliseconds in one day
	    let ONE_DAY = 1000 * 60 * 60 * 24;

	    // Convert both dates to milliseconds
	    let date1_ms = date1.getTime();
	    let date2_ms = date2.getTime();

	    // Calculate the difference in milliseconds
	    let difference_ms = Math.abs(date1_ms - date2_ms);

	    // Convert back to days and return
	    return Math.floor(difference_ms / ONE_DAY) + 1;
	};

	const getInterval = (startDate, endDate, qn) => {
	    if (startDate === endDate) {
	        let period = 1440 / qn; //24* 60
	        let periodsArray = [];
	        for (let i = 1; i < qn; i++) {
	            let hours = Math.floor(Math.round(period) * i / 60);
	            let minutes = Math.floor(Math.abs(period * i - hours * 60));
	            if (minutes < 10) {
	                minutes += `${ minutes }`;
	            }
	            periodsArray.push(`${ hours }:${ minutes }`);
	        }
	        return periodsArray;
	    } else {
	        try {
	            let diff = daydiff(new Date(startDate), new Date(endDate));
	            console.log(diff);
	            let period = 1440 / qn;
	            let periodsArray = [];
	            for (let j = 0; j < diff + 1; j++) {
	                for (let i = 1; i < qn; i++) {
	                    let hours = Math.floor(Math.round(period) * i / 60);
	                    let minutes = Math.floor(Math.abs(period * i - hours * 60));
	                    if (minutes < 10) {
	                        minutes += `${ minutes }`;
	                    }
	                    periodsArray.push(`${ hours }:${ minutes }`);
	                }
	            }
	            return periodsArray;
	        } catch (e) {
	            console.log(e);
	        }
	    }
	};

	router.get('/api/:id', (() => {
	    var _ref = _asyncToGenerator(function* (ctx) {
	        try {
	            ctx.body = yield (0, _json.readJSON)(`./store/${ ctx.params.id }.json`);
	        } catch (e) {
	            ctx.status = 404;
	        }
	    });

	    return function (_x) {
	        return _ref.apply(this, arguments);
	    };
	})()).post('/api/create', (() => {
	    var _ref2 = _asyncToGenerator(function* (ctx) {
	        try {
	            let id = _nodeUuid2.default.v1();
	            ctx.body = id;
	            let body = ctx.request.body;

	            console.log('start date');
	            console.log(new Date(body.startDate));
	            console.log('end date');
	            console.log(new Date(body.endDate));
	            console.log('diff');
	            console.log(daydiff(new Date(body.startDate), new Date(body.endDate)));
	            console.log('qn');
	            console.log(body.quantity);
	            body.intervals = getInterval(body.startDate, body.endDate, body.quantity);

	            if (body.startDate != body.endDate) {
	                let diff = daydiff(new Date(body.startDate), new Date(body.endDate));
	                body.quantity = (diff + 1) * (body.quantity - 1);
	            } else {
	                body.quantity = body.quantity - 1;
	            }
	            body.id = id;
	            body.users = [];
	            yield (0, _json.writeJSON)(`./store/${ id }.json`, JSON.stringify(body));
	        } catch (e) {
	            ctx.status = 500;
	        }
	    });

	    return function (_x2) {
	        return _ref2.apply(this, arguments);
	    };
	})()).post('/api/:id', (() => {
	    var _ref3 = _asyncToGenerator(function* (ctx) {
	        try {
	            let user = ctx.request.body;
	            let temp = yield (0, _json.readJSON)(`./store/${ ctx.params.id }.json`);
	            temp.users.push(user);
	            ctx.body = temp;
	            yield (0, _json.writeJSON)(`./store/${ ctx.params.id }.json`, JSON.stringify(temp));
	        } catch (e) {
	            ctx.status = 500;
	        }
	    });

	    return function (_x3) {
	        return _ref3.apply(this, arguments);
	    };
	})());
	app.use(router.routes());

	app.use((0, _koaConvert2.default)((0, _koaHistoryApiFallback2.default)()));
	app.use((0, _koaConvert2.default)((0, _koaCors2.default)()));
	app.use((0, _koaConvert2.default)((0, _koaStatic2.default)('./frontend/public/')));
	app.listen(3000, () => console.log('server started 3000'));

	exports.default = app;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("koa");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("koa-router");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.writeJSON = exports.readJSON = undefined;

	var _fs = __webpack_require__(4);

	var _fs2 = _interopRequireDefault(_fs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	const readJSON = filename => {
	    return new Promise((resolve, reject) => {
	        _fs2.default.readFile(filename, 'utf8', (err, res) => {
	            if (err) {
	                reject(err);
	            }
	            try {
	                res = JSON.parse(res);
	                resolve(res);
	            } catch (e) {
	                reject(e);
	            }
	        });
	    });
	}; /**
	    * Created by sergeyzubov on 24/09/2016.
	    */


	const writeJSON = (filename, data) => {
	    return new Promise((resolve, reject) => {
	        _fs2.default.writeFile(filename, data, err => {
	            if (err) {
	                reject(err);
	            } else {
	                resolve();
	            }
	        });
	    });
	};

	exports.readJSON = readJSON;
	exports.writeJSON = writeJSON;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("node-uuid");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("koa-bodyparser");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("koa-logger");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("koa-convert");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("koa-static");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("koa-send");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("koa-cors");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("koa-history-api-fallback");

/***/ }
/******/ ]);