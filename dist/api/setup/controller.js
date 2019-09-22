"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setCollection = exports.setupSystem = exports.getCollection = undefined;

var getCollection = exports.getCollection = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        result = ["user", "setting", "bank"];
                        return _context.abrupt("return", (0, _lib.success)(res, 201, result, "Valid setup collections!"));

                    case 2:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee);
    }));

    return function getCollection(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var setupSystem = exports.setupSystem = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var accessToken, results, options;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        accessToken = (0, _authorization.getToken)(req);
                        results = void 0;

                        console.log("\nThis is token \n\n\n", accessToken);

                        options = {
                            uri: setupUrls[0],
                            method: "GET",
                            auth: { bearer: accessToken },
                            headers: { "User-Agent": "Request-Promise" },
                            json: true
                        };
                        _context2.prev = 4;
                        _context2.next = 7;
                        return Promise.all(setupUrls.map(function (setupUrl) {
                            options.uri = setupUrl;
                            return (0, _requestPromise2.default)(options);
                        }));

                    case 7:
                        results = _context2.sent;
                        _context2.next = 14;
                        break;

                    case 10:
                        _context2.prev = 10;
                        _context2.t0 = _context2["catch"](4);

                        console.log(_context2.t0.message);
                        return _context2.abrupt("return", (0, _lib.fail)(res, 401, "Error settingup system " + _context2.t0.message));

                    case 14:
                        return _context2.abrupt("return", (0, _lib.success)(res, 201, results, "System Setup complete!"));

                    case 15:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, null, [[4, 10]]);
    }));

    return function setupSystem(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

var setCollection = exports.setCollection = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var _req$params, module, collection, model, tablePath, table, result;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _req$params = req.params, module = _req$params.module, collection = _req$params.collection;
                        model = void 0;
                        tablePath = _path2.default.join(__dirname, "../" + module + "/table");
                        // eslint-disable-next-line import/no-dynamic-require

                        table = require("" + tablePath).default;

                        console.log(table);
                        _context3.prev = 5;
                        _context3.t0 = collection;
                        _context3.next = _context3.t0 === "setting" ? 9 : _context3.t0 === "user" ? 11 : _context3.t0 === "bank" ? 14 : 16;
                        break;

                    case 9:
                        model = _model4.default;return _context3.abrupt("break", 17);

                    case 11:
                        model = _model2.default;delete table[0];return _context3.abrupt("break", 17);

                    case 14:
                        model = _model6.default;return _context3.abrupt("break", 17);

                    case 16:
                        return _context3.abrupt("return", (0, _lib.fail)(res, 401, "Error invalid collection: " + collection));

                    case 17:
                        _context3.next = 19;
                        return model.insertMany(table);

                    case 19:
                        result = _context3.sent;

                        if (result) {
                            _context3.next = 23;
                            break;
                        }

                        logger.info("Operation was successful", []);
                        return _context3.abrupt("return", (0, _lib.notFound)(res, "Error: Bad Request: Model not found"));

                    case 23:
                        return _context3.abrupt("return", (0, _lib.success)(res, 201, result, "Record created successfully!"));

                    case 26:
                        _context3.prev = 26;
                        _context3.t1 = _context3["catch"](5);

                        logger.error(_context3.t1);
                        return _context3.abrupt("return", (0, _lib.fail)(res, 500, "Error creating record. " + _context3.t1.message));

                    case 30:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, null, [[5, 26]]);
    }));

    return function setCollection(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

var _log4js = require("log4js");

var _log4js2 = _interopRequireDefault(_log4js);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _requestPromise = require("request-promise");

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _model = require("../user/model");

var _model2 = _interopRequireDefault(_model);

var _model3 = require("../setting/model");

var _model4 = _interopRequireDefault(_model3);

var _model5 = require("../bank/model");

var _model6 = _interopRequireDefault(_model5);

var _lib = require("../../lib");

var _authorization = require("../../middleware/authorization");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* eslint-disable global-require */
/* eslint-disable complexity */


// Logging
var logger = _log4js2.default.getLogger("[setup]");
_log4js2.default.configure({
    appenders: { file: { type: "file", filename: "logs/setup.log" } },
    categories: { default: { appenders: ["file"], level: "debug" } }
});

var host = void 0;
if (process.env.NODE_ENV === "development") {
    host = process.env.SERVER_DEV;
} else {
    host = process.env.SERVER_PROD;
}

var setupUrls = [
// `${host}/api/setups/preload/{folder}/{collection}`,
host + "/api/setups/preload/user/user", host + "/api/setups/preload/setting/setting", host + "/api/setups/preload/bank/bank"];
//# sourceMappingURL=controller.js.map