"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.login = exports.deleteRecord = exports.updateRecord = exports.createRecord = exports.fetchRecord = undefined;

var fetchRecord = exports.fetchRecord = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var query, _aqp, filter, skip, limit, sort, projection, result;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        query = req.query;
                        _aqp = (0, _apiQueryParams2.default)(query), filter = _aqp.filter, skip = _aqp.skip, limit = _aqp.limit, sort = _aqp.sort, projection = _aqp.projection;
                        _context.prev = 2;

                        if (req.user.type === "CUSTOMER") {
                            filter.user = req.user.id;
                        }
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
                        logger.info("SUCCESS", []);
                        return _context.abrupt("return", (0, _lib.success)(res, 201, result, null));

                    case 13:
                        _context.prev = 13;
                        _context.t0 = _context["catch"](2);

                        logger.error(_context.t0);
                        return _context.abrupt("return", (0, _lib.fail)(res, 500, "Error retrieving record. " + _context.t0.message));

                    case 17:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, null, [[2, 13]]);
    }));

    return function fetchRecord(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

// eslint-disable-next-line complexity


var createRecord = exports.createRecord = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var data, _schemaCreate$validat, error, email, phone, duplicate, newRecord, result;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        data = req.body;

                        data.api_key = (0, _helpers.genCode)(32).toLowerCase();
                        if ((0, _lib.hasProp)(data, "password")) data.password = (0, _lib.hash)(req.body.password);
                        _schemaCreate$validat = _model.schemaCreate.validate(data), error = _schemaCreate$validat.error;

                        if (!error) {
                            _context2.next = 6;
                            break;
                        }

                        return _context2.abrupt("return", (0, _lib.fail)(res, 422, "Error validating request data. " + error.message));

                    case 6:
                        email = data.email, phone = data.phone;
                        _context2.next = 9;
                        return _model2.default.findOne({ $or: [{ email: email }, { phone: phone }] }).exec();

                    case 9:
                        duplicate = _context2.sent;

                        if (!duplicate) {
                            _context2.next = 12;
                            break;
                        }

                        return _context2.abrupt("return", (0, _lib.fail)(res, 422, "Error! Record already exist for " + email + " or " + phone));

                    case 12:
                        newRecord = new _model2.default(data);
                        _context2.prev = 13;
                        _context2.next = 16;
                        return newRecord.save();

                    case 16:
                        result = _context2.sent;

                        if (result) {
                            _context2.next = 20;
                            break;
                        }

                        logger.info("SUCCESS", []);
                        return _context2.abrupt("return", (0, _lib.notFound)(res, "Error: Bad Request: Model not found"));

                    case 20:
                        return _context2.abrupt("return", (0, _lib.success)(res, 201, result, "Record created successfully!"));

                    case 23:
                        _context2.prev = 23;
                        _context2.t0 = _context2["catch"](13);

                        logger.error(_context2.t0);
                        return _context2.abrupt("return", (0, _lib.fail)(res, 500, "Error creating record. " + _context2.t0.message));

                    case 27:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, null, [[13, 23]]);
    }));

    return function createRecord(_x3, _x4) {
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

                        if ((0, _lib.hasProp)(data, "password")) data.password = (0, _lib.hash)(req.body.password);
                        _schemaUpdate$validat = _model.schemaUpdate.validate(data), error = _schemaUpdate$validat.error;

                        if (!error) {
                            _context3.next = 6;
                            break;
                        }

                        return _context3.abrupt("return", (0, _lib.fail)(res, 422, "Error validating request data. " + error.message));

                    case 6:
                        _context3.prev = 6;
                        _context3.next = 9;
                        return _model2.default.findOneAndUpdate({ _id: id }, data, { new: true });

                    case 9:
                        result = _context3.sent;

                        if (result) {
                            _context3.next = 12;
                            break;
                        }

                        return _context3.abrupt("return", (0, _lib.notFound)(res, "Bad Request: Model not found with id " + id));

                    case 12:
                        return _context3.abrupt("return", (0, _lib.success)(res, 200, result, "Record updated successfully!"));

                    case 15:
                        _context3.prev = 15;
                        _context3.t0 = _context3["catch"](6);

                        logger.error(_context3.t0);
                        return _context3.abrupt("return", (0, _lib.fail)(res, 500, "Error updating record. " + _context3.t0.message));

                    case 19:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, null, [[6, 15]]);
    }));

    return function updateRecord(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

var deleteRecord = exports.deleteRecord = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var id, result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        id = req.params.recordId;
                        _context4.prev = 1;
                        _context4.next = 4;
                        return _model2.default.findOneAndRemove({ _id: id });

                    case 4:
                        result = _context4.sent;

                        if (result) {
                            _context4.next = 7;
                            break;
                        }

                        return _context4.abrupt("return", (0, _lib.notFound)(res, "Bad Request: Model not found with id " + id));

                    case 7:
                        return _context4.abrupt("return", (0, _lib.success)(res, 204, result, "Record deleted successfully!"));

                    case 10:
                        _context4.prev = 10;
                        _context4.t0 = _context4["catch"](1);

                        logger.error(_context4.t0);
                        return _context4.abrupt("return", (0, _lib.fail)(res, 500, "Error deleting record. " + _context4.t0.message));

                    case 14:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, null, [[1, 10]]);
    }));

    return function deleteRecord(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

var login = exports.login = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var _schemaLogin$validate, error;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        console.log(req.body);
                        _schemaLogin$validate = _model.schemaLogin.validate(req.body), error = _schemaLogin$validate.error;

                        if (!error) {
                            _context5.next = 4;
                            break;
                        }

                        return _context5.abrupt("return", (0, _lib.fail)(res, 422, "Error validating request data. " + error.message));

                    case 4:
                        return _context5.abrupt("return", (0, _services.userAuthenticate)(req.body).then(function (userToken) {
                            return (0, _lib.success)(res, 201, userToken, "Login was successful!");
                        }).catch(function (err) {
                            return (0, _lib.fail)(res, 403, "Authentication failed  " + err.message);
                        }));

                    case 5:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5);
    }));

    return function login(_x9, _x10) {
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

var _services = require("../../services");

var _helpers = require("../../lib/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Logging
var logger = _log4js2.default.getLogger("[user]");
_log4js2.default.configure({
    appenders: { file: { type: "file", filename: "logs/user.log" } },
    categories: { default: { appenders: ["file"], level: "debug" } }
});
//# sourceMappingURL=controller.js.map