"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteRecord = exports.createRecord = exports.fetchRecord = undefined;

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
                        _context.next = 5;
                        return _model2.default.find(filter).populate("user", "id phone email username fullname").populate("created_by", "id username fullname, phone email type level").populate("updated_by", "id username fullname, phone email type level").skip(skip).limit(limit).sort(sort).select(projection).exec();

                    case 5:
                        result = _context.sent;

                        if (result) {
                            _context.next = 8;
                            break;
                        }

                        return _context.abrupt("return", (0, _lib.notFound)(res, "Error: Bad Request: Model not found"));

                    case 8:
                        logger.info("Operation was successful", []);
                        return _context.abrupt("return", (0, _lib.success)(res, 201, result, null));

                    case 12:
                        _context.prev = 12;
                        _context.t0 = _context["catch"](2);

                        logger.error(_context.t0);
                        return _context.abrupt("return", (0, _lib.fail)(res, 500, "Error retrieving record. " + _context.t0.message));

                    case 16:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, null, [[2, 12]]);
    }));

    return function fetchRecord(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

// eslint-disable-next-line complexity


var createRecord = exports.createRecord = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var data, _Joi$validate, error, newRecord, recipient, sender, subject, body, personR, Sender, personS, send1, send2, result, newRecord2, result2;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        data = req.body;
                        _Joi$validate = _joi2.default.validate(data, _model.schemaCreate), error = _Joi$validate.error;

                        if (!error) {
                            _context2.next = 4;
                            break;
                        }

                        return _context2.abrupt("return", (0, _lib.fail)(res, 422, "Error validating request data. " + error.message));

                    case 4:
                        _context2.prev = 4;

                        data.box = "INBOX";
                        newRecord = new _model2.default(data);
                        recipient = data.recipient, sender = data.sender, subject = data.subject, body = data.body;
                        _context2.next = 10;
                        return _model4.default.findOne({ _id: recipient }).select("email").exec();

                    case 10:
                        personR = _context2.sent;
                        Sender = void 0;
                        _context2.next = 14;
                        return Sender.findOne({ _id: data.created_by }).select("email").exec();

                    case 14:
                        personS = _context2.sent;
                        _context2.next = 17;
                        return (0, _services.sendEmail)(personR.email, personS.email, subject, body);

                    case 17:
                        send1 = _context2.sent;
                        _context2.next = 20;
                        return (0, _services.sendEmail)(personS.email, personS.email, subject, body);

                    case 20:
                        send2 = _context2.sent;
                        _context2.next = 23;
                        return newRecord.save();

                    case 23:
                        result = _context2.sent;

                        if (result) {
                            _context2.next = 27;
                            break;
                        }

                        logger.error("Operation failed", send1, send2, []);
                        return _context2.abrupt("return", (0, _lib.notFound)(res, "Error: Bad Request: Model not found"));

                    case 27:
                        data.box = "OUTBOX";
                        newRecord2 = new _model2.default(data);
                        _context2.next = 31;
                        return newRecord2.save();

                    case 31:
                        result2 = _context2.sent;
                        return _context2.abrupt("return", (0, _lib.success)(res, 201, result2, "Record created successfully!"));

                    case 35:
                        _context2.prev = 35;
                        _context2.t0 = _context2["catch"](4);

                        logger.error(_context2.t0);
                        return _context2.abrupt("return", (0, _lib.fail)(res, 500, "Error creating record. " + _context2.t0.message));

                    case 39:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, null, [[4, 35]]);
    }));

    return function createRecord(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

var deleteRecord = exports.deleteRecord = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var id, result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        id = req.params.recordId;
                        _context3.prev = 1;
                        _context3.next = 4;
                        return _model2.default.findOneAndRemove({ _id: id });

                    case 4:
                        result = _context3.sent;

                        if (result) {
                            _context3.next = 7;
                            break;
                        }

                        return _context3.abrupt("return", (0, _lib.notFound)(res, "Bad Request: Model not found with id " + id));

                    case 7:
                        return _context3.abrupt("return", (0, _lib.success)(res, 200, result, "Record deleted successfully!"));

                    case 10:
                        _context3.prev = 10;
                        _context3.t0 = _context3["catch"](1);

                        logger.error(_context3.t0);
                        return _context3.abrupt("return", (0, _lib.fail)(res, 500, "Error deleting record. " + _context3.t0.message));

                    case 14:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, null, [[1, 10]]);
    }));

    return function deleteRecord(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

var _joi = require("joi");

var _joi2 = _interopRequireDefault(_joi);

var _log4js = require("log4js");

var _log4js2 = _interopRequireDefault(_log4js);

var _apiQueryParams = require("api-query-params");

var _apiQueryParams2 = _interopRequireDefault(_apiQueryParams);

var _model = require("./model");

var _model2 = _interopRequireDefault(_model);

var _lib = require("../../lib");

var _services = require("../../services");

var _model3 = require("../user/model");

var _model4 = _interopRequireDefault(_model3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Logging
var logger = _log4js2.default.getLogger("[message]");
_log4js2.default.configure({
    appenders: { file: { type: "file", filename: "logs/message.log" } },
    categories: { default: { appenders: ["file"], level: "debug" } }
});
//# sourceMappingURL=controller.js.map