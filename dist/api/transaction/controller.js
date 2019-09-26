"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteRecord = exports.updateRecord = exports.createRecord = exports.fetchRecord = exports.getTransaction = undefined;

var getTransaction = exports.getTransaction = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(query) {
        var _aqp, filter, skip, limit, sort, projection, result;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _aqp = (0, _apiQueryParams2.default)(query), filter = _aqp.filter, skip = _aqp.skip, limit = _aqp.limit, sort = _aqp.sort, projection = _aqp.projection;
                        _context.next = 3;
                        return _model2.default.find(filter).populate("user", "title surname given_name email phone credit blocked deleted").skip(skip).limit(limit).sort(sort).select(projection).exec();

                    case 3:
                        result = _context.sent;
                        return _context.abrupt("return", result);

                    case 5:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee);
    }));

    return function getTransaction(_x) {
        return _ref.apply(this, arguments);
    };
}();

var fetchRecord = exports.fetchRecord = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var query, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        query = req.query;
                        _context2.prev = 1;
                        result = getTransaction(query);

                        if (result) {
                            _context2.next = 5;
                            break;
                        }

                        return _context2.abrupt("return", (0, _lib.notFound)(res, "Error: Bad Request: Model not found"));

                    case 5:
                        logger.info("Operation was successful", []);
                        return _context2.abrupt("return", (0, _lib.success)(res, 201, result, null));

                    case 9:
                        _context2.prev = 9;
                        _context2.t0 = _context2["catch"](1);

                        logger.error(_context2.t0);
                        return _context2.abrupt("return", (0, _lib.fail)(res, 500, "Error retrieving record. " + _context2.t0.message));

                    case 13:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, null, [[1, 9]]);
    }));

    return function fetchRecord(_x2, _x3) {
        return _ref2.apply(this, arguments);
    };
}();

var createRecord = exports.createRecord = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var data, _schemaCreate$validat, error, newRecord, result, result2;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        data = req.body;
                        _schemaCreate$validat = _model.schemaCreate.validate(data), error = _schemaCreate$validat.error;

                        if (!error) {
                            _context3.next = 4;
                            break;
                        }

                        return _context3.abrupt("return", (0, _lib.fail)(res, 422, "Error validating request data. " + error.message));

                    case 4:
                        newRecord = new _model2.default(data);
                        _context3.prev = 5;
                        _context3.next = 8;
                        return newRecord.save();

                    case 8:
                        result = _context3.sent;

                        if (result) {
                            _context3.next = 12;
                            break;
                        }

                        logger.info("SUCCESS", []);
                        return _context3.abrupt("return", (0, _lib.notFound)(res, "Error: Bad Request: Model not found"));

                    case 12:
                        _context3.next = 14;
                        return _model4.default.update({ _id: result.user._id }, { $push: { transactions: result._id } }).exec();

                    case 14:
                        result2 = _context3.sent;
                        return _context3.abrupt("return", (0, _lib.success)(res, 201, result, "Record created successfully!"));

                    case 18:
                        _context3.prev = 18;
                        _context3.t0 = _context3["catch"](5);

                        logger.error(_context3.t0);
                        return _context3.abrupt("return", (0, _lib.fail)(res, 500, "Error creating record. " + _context3.t0.message));

                    case 22:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, null, [[5, 18]]);
    }));

    return function createRecord(_x4, _x5) {
        return _ref3.apply(this, arguments);
    };
}();

var updateRecord = exports.updateRecord = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var data, id, _schemaUpdate$validat, error, result;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        data = req.body;
                        id = req.params.recordId;
                        _schemaUpdate$validat = _model.schemaUpdate.validate(data), error = _schemaUpdate$validat.error;

                        if (!error) {
                            _context4.next = 5;
                            break;
                        }

                        return _context4.abrupt("return", (0, _lib.fail)(res, 422, "Error validating request data. " + error.message));

                    case 5:
                        _context4.prev = 5;
                        _context4.next = 8;
                        return _model2.default.findOneAndUpdate({ _id: id }, data, { new: true });

                    case 8:
                        result = _context4.sent;

                        if (result) {
                            _context4.next = 11;
                            break;
                        }

                        return _context4.abrupt("return", (0, _lib.notFound)(res, "Bad Request: Model not found with id " + id));

                    case 11:
                        return _context4.abrupt("return", (0, _lib.success)(res, 200, result, "Record updated successfully!"));

                    case 14:
                        _context4.prev = 14;
                        _context4.t0 = _context4["catch"](5);

                        logger.error(_context4.t0);
                        return _context4.abrupt("return", (0, _lib.fail)(res, 500, "Error updating record. " + _context4.t0.message));

                    case 18:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, null, [[5, 14]]);
    }));

    return function updateRecord(_x6, _x7) {
        return _ref4.apply(this, arguments);
    };
}();

var deleteRecord = exports.deleteRecord = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var id, result, result2;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        id = req.params.recordId;
                        _context5.prev = 1;
                        _context5.next = 4;
                        return _model2.default.findOneAndRemove({ _id: id });

                    case 4:
                        result = _context5.sent;

                        if (result) {
                            _context5.next = 7;
                            break;
                        }

                        return _context5.abrupt("return", (0, _lib.notFound)(res, "Bad Request: Model not found with id " + id));

                    case 7:
                        _context5.next = 9;
                        return _model4.default.update({ _id: result.user._id }, { $pull: { transactions: result._id } }).exec();

                    case 9:
                        result2 = _context5.sent;
                        return _context5.abrupt("return", (0, _lib.success)(res, 200, result, "Record deleted successfully!"));

                    case 13:
                        _context5.prev = 13;
                        _context5.t0 = _context5["catch"](1);

                        logger.error(_context5.t0);
                        return _context5.abrupt("return", (0, _lib.fail)(res, 500, "Error deleting record. " + _context5.t0.message));

                    case 17:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5, null, [[1, 13]]);
    }));

    return function deleteRecord(_x8, _x9) {
        return _ref5.apply(this, arguments);
    };
}();

var _log4js = require("log4js");

var _log4js2 = _interopRequireDefault(_log4js);

var _apiQueryParams = require("api-query-params");

var _apiQueryParams2 = _interopRequireDefault(_apiQueryParams);

var _model = require("./model");

var _model2 = _interopRequireDefault(_model);

var _lib = require("../../lib");

var _model3 = require("../user/model");

var _model4 = _interopRequireDefault(_model3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Logging
var logger = _log4js2.default.getLogger("[transaction]");
_log4js2.default.configure({
    appenders: { file: { type: "file", filename: "logs/transaction.log" } },
    categories: { default: { appenders: ["file"], level: "debug" } }
});
//# sourceMappingURL=controller.js.map