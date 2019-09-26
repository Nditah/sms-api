"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateRecord = exports.fetchRecord = exports.fetchRecordPublic = undefined;

var fetchRecordPublic = exports.fetchRecordPublic = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var query, _aqp, filter, skip, limit, sort, projection, result;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        query = req.query;
                        _aqp = (0, _apiQueryParams2.default)(query), filter = _aqp.filter, skip = _aqp.skip, limit = _aqp.limit, sort = _aqp.sort, projection = _aqp.projection;

                        filter.access = "public";
                        _context.prev = 3;
                        _context.next = 6;
                        return _model2.default.find(filter).skip(skip).limit(limit).sort(sort).select(projection).exec();

                    case 6:
                        result = _context.sent;

                        if (result) {
                            _context.next = 9;
                            break;
                        }

                        return _context.abrupt("return", (0, _lib.notFound)(res, "Error: Bad Request: Model not found"));

                    case 9:
                        logger.info("Operation was successful", []);
                        return _context.abrupt("return", (0, _lib.success)(res, 201, result, null));

                    case 13:
                        _context.prev = 13;
                        _context.t0 = _context["catch"](3);

                        logger.error(_context.t0);
                        return _context.abrupt("return", (0, _lib.fail)(res, 500, "Error retrieving record. " + _context.t0.message));

                    case 17:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, null, [[3, 13]]);
    }));

    return function fetchRecordPublic(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var fetchRecord = exports.fetchRecord = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var query, _aqp2, filter, skip, limit, sort, projection, result;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        query = req.query;
                        _aqp2 = (0, _apiQueryParams2.default)(query), filter = _aqp2.filter, skip = _aqp2.skip, limit = _aqp2.limit, sort = _aqp2.sort, projection = _aqp2.projection;
                        _context2.prev = 2;
                        _context2.next = 5;
                        return _model2.default.find(filter).skip(skip).limit(limit).sort(sort).select(projection).exec();

                    case 5:
                        result = _context2.sent;

                        if (result) {
                            _context2.next = 8;
                            break;
                        }

                        return _context2.abrupt("return", (0, _lib.notFound)(res, "Error: Bad Request: Model not found"));

                    case 8:
                        logger.info("Operation was successful", []);
                        return _context2.abrupt("return", (0, _lib.success)(res, 201, result, null));

                    case 12:
                        _context2.prev = 12;
                        _context2.t0 = _context2["catch"](2);

                        logger.error(_context2.t0);
                        return _context2.abrupt("return", (0, _lib.fail)(res, 500, "Error retrieving record. " + _context2.t0.message));

                    case 16:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, null, [[2, 12]]);
    }));

    return function fetchRecord(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

var updateRecord = exports.updateRecord = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var data, id, _schemaUpdate$validat, error, result;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        data = req.body;
                        id = req.params.recordId;
                        _schemaUpdate$validat = _model.schemaUpdate.validate(data), error = _schemaUpdate$validat.error;

                        if (!error) {
                            _context3.next = 5;
                            break;
                        }

                        return _context3.abrupt("return", (0, _lib.fail)(res, 422, "Error validating request data. " + error.message));

                    case 5:
                        _context3.prev = 5;
                        _context3.next = 8;
                        return _model2.default.findOneAndUpdate({ _id: id }, data, { new: true }).exec();

                    case 8:
                        result = _context3.sent;

                        if (result) {
                            _context3.next = 11;
                            break;
                        }

                        return _context3.abrupt("return", (0, _lib.notFound)(res, "Bad Request: Model not found with id " + id));

                    case 11:
                        return _context3.abrupt("return", (0, _lib.success)(res, 200, result, "Record updated successfully!"));

                    case 14:
                        _context3.prev = 14;
                        _context3.t0 = _context3["catch"](5);

                        logger.error(_context3.t0);
                        return _context3.abrupt("return", (0, _lib.fail)(res, 500, "Error updating record. " + _context3.t0.message));

                    case 18:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, null, [[5, 14]]);
    }));

    return function updateRecord(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

var _joi = require("@hapi/joi");

var _joi2 = _interopRequireDefault(_joi);

var _log4js = require("log4js");

var _log4js2 = _interopRequireDefault(_log4js);

var _apiQueryParams = require("api-query-params");

var _apiQueryParams2 = _interopRequireDefault(_apiQueryParams);

var _model = require("./model");

var _model2 = _interopRequireDefault(_model);

var _lib = require("../../lib");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Logging
var logger = _log4js2.default.getLogger("[setting]");
_log4js2.default.configure({
    appenders: { file: { type: "file", filename: "logs/setting.log" } },
    categories: { default: { appenders: ["file"], level: "debug" } }
});
//# sourceMappingURL=controller.js.map