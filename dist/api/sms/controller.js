"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createWebhook = exports.createRecord = exports.createOtp = exports.fetchRecord = exports.getSms = undefined;

var getSms = exports.getSms = function () {
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

    return function getSms(_x) {
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
                        result = getSms(query);

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

// eslint-disable-next-line complexity


var createOtp = exports.createOtp = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var otp, phone, send, sid, record, newRecord, result1, query, update, result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        otp = (0, _lib.generateOtp)().toString();
                        phone = req.body.phone;

                        if (!phone) (0, _lib.fail)(res, 422, "Error invalid phone");

                        _context3.prev = 3;
                        _context3.next = 6;
                        return (0, _services.sendSmsAsync)(phone, otp);

                    case 6:
                        send = _context3.sent;
                        sid = send.sid;

                        if (sid) {
                            _context3.next = 10;
                            break;
                        }

                        return _context3.abrupt("return", (0, _lib.fail)(res, 422, "Error sending message"));

                    case 10:
                        otp = (0, _lib.hash)(otp);
                        record = { recipient: phone, message: otp, sid: sid, direction: "OUTBOUND" };
                        newRecord = new _model2.default(record);
                        _context3.next = 15;
                        return newRecord.save();

                    case 15:
                        result1 = _context3.sent;

                        console.log(result1);
                        query = { phone: phone };
                        update = { otp: otp, otp_access: true, $inc: { otp_count: 1 } };
                        _context3.next = 21;
                        return _model4.default.findOneAndUpdate(query, update, { new: true });

                    case 21:
                        result = _context3.sent;

                        if (result) {
                            _context3.next = 25;
                            break;
                        }

                        logger.info("Operation was successful", []);
                        return _context3.abrupt("return", (0, _lib.notFound)(res, "Error: Bad Request: Model not found"));

                    case 25:
                        return _context3.abrupt("return", (0, _lib.success)(res, 201, send.to, "Record created successfully!"));

                    case 28:
                        _context3.prev = 28;
                        _context3.t0 = _context3["catch"](3);

                        logger.error(_context3.t0);
                        return _context3.abrupt("return", (0, _lib.fail)(res, 500, "Error creating record. " + _context3.t0.message));

                    case 32:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, null, [[3, 28]]);
    }));

    return function createOtp(_x4, _x5) {
        return _ref3.apply(this, arguments);
    };
}();

// eslint-disable-next-line complexity


var createRecord = exports.createRecord = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var data, _data, recipientList, _schemaCreate$validat, error, myArray, sendingSms, resolvedFinalArray, result2;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        data = {};

                        if (req.method === "POST") {
                            data = req.body;
                        } else {
                            data = req.query;
                        }
                        _data = data, recipientList = _data.recipient;
                        _context5.prev = 3;

                        data.code = (0, _lib.genCode)(32);
                        _schemaCreate$validat = _model.schemaCreate.validate(data), error = _schemaCreate$validat.error;

                        if (!error) {
                            _context5.next = 8;
                            break;
                        }

                        return _context5.abrupt("return", (0, _lib.fail)(res, 422, "Error validating request data. " + error.message));

                    case 8:
                        myArray = (0, _lib.stringToArrayPhone)(recipientList) || [];
                        sendingSms = myArray.length;

                        if (!(sendingSms > data.credit)) {
                            _context5.next = 12;
                            break;
                        }

                        return _context5.abrupt("return", (0, _lib.fail)(res, 422, "Error! You have " + data.credit + " units left. You cannot send " + sendingSms + " sms"));

                    case 12:
                        _context5.next = 14;
                        return Promise.all(myArray.map(function () {
                            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(phone) {
                                var send, newRecord, result;
                                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                    while (1) {
                                        switch (_context4.prev = _context4.next) {
                                            case 0:
                                                _context4.next = 2;
                                                return (0, _services.sendSmsAsync)(phone, data.message);

                                            case 2:
                                                send = _context4.sent;

                                                logger.error(send);
                                                data.sid = send.sid;
                                                data.recipient = phone;
                                                newRecord = new _model2.default(data);
                                                _context4.next = 9;
                                                return newRecord.save();

                                            case 9:
                                                result = _context4.sent;
                                                return _context4.abrupt("return", result);

                                            case 11:
                                            case "end":
                                                return _context4.stop();
                                        }
                                    }
                                }, _callee4);
                            }));

                            return function (_x8) {
                                return _ref5.apply(this, arguments);
                            };
                        }() // important to return the value
                        ));

                    case 14:
                        resolvedFinalArray = _context5.sent;
                        _context5.next = 17;
                        return _model4.default.findOneAndUpdate({ _id: data.created_by }, { $inc: { credit: -sendingSms } }, { new: true });

                    case 17:
                        result2 = _context5.sent;
                        return _context5.abrupt("return", (0, _lib.success)(res, 201, resolvedFinalArray, "Record created successfully!"));

                    case 21:
                        _context5.prev = 21;
                        _context5.t0 = _context5["catch"](3);

                        logger.error(_context5.t0);
                        return _context5.abrupt("return", (0, _lib.fail)(res, 500, "Error creating record. " + _context5.t0.message));

                    case 25:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5, null, [[3, 21]]);
    }));

    return function createRecord(_x6, _x7) {
        return _ref4.apply(this, arguments);
    };
}();

var createWebhook = exports.createWebhook = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var data;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        data = req.body;

                        (0, _services.receiveSms)(req, res);
                        logger.info("Operation was successful", data);

                    case 3:
                    case "end":
                        return _context6.stop();
                }
            }
        }, _callee6);
    }));

    return function createWebhook(_x9, _x10) {
        return _ref6.apply(this, arguments);
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

var _services = require("../../services");

var _model3 = require("../user/model");

var _model4 = _interopRequireDefault(_model3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Logging
var logger = _log4js2.default.getLogger("[sms]");
_log4js2.default.configure({
    appenders: { file: { type: "file", filename: "logs/sms.log" } },
    categories: { default: { appenders: ["file"], level: "debug" } }
});
//# sourceMappingURL=controller.js.map