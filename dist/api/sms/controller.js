"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createWebhook = exports.createRecord = exports.createOtp = exports.fetchRecord = undefined;

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
                        return _model2.default.find(filter).populate("created_by", "id phone email type").skip(skip).limit(limit).sort(sort).select(projection).exec();

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


var createOtp = exports.createOtp = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var otp, phone, send, sid, record, newRecord, result1, query, update, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        otp = (0, _lib.generateOtp)().toString();
                        phone = req.body.phone;

                        if (!phone) (0, _lib.fail)(res, 422, "Error invalid phone");

                        _context2.prev = 3;
                        _context2.next = 6;
                        return (0, _services.sendSmsAsync)(phone, otp);

                    case 6:
                        send = _context2.sent;
                        sid = send.sid;

                        if (sid) {
                            _context2.next = 10;
                            break;
                        }

                        return _context2.abrupt("return", (0, _lib.fail)(res, 422, "Error sending message"));

                    case 10:
                        otp = (0, _lib.hash)(otp);
                        record = { recipient: phone, message: otp, sid: sid, direction: "OUTBOUND" };
                        newRecord = new _model2.default(record);
                        _context2.next = 15;
                        return newRecord.save();

                    case 15:
                        result1 = _context2.sent;

                        console.log(result1);
                        query = { phone: phone };
                        update = { otp: otp, otp_access: true, $inc: { otp_count: 1 } };
                        _context2.next = 21;
                        return _model4.default.findOneAndUpdate(query, update, { new: true });

                    case 21:
                        result = _context2.sent;

                        if (result) {
                            _context2.next = 25;
                            break;
                        }

                        logger.info("Operation was successful", []);
                        return _context2.abrupt("return", (0, _lib.notFound)(res, "Error: Bad Request: Model not found"));

                    case 25:
                        return _context2.abrupt("return", (0, _lib.success)(res, 201, send.to, "Record created successfully!"));

                    case 28:
                        _context2.prev = 28;
                        _context2.t0 = _context2["catch"](3);

                        logger.error(_context2.t0);
                        return _context2.abrupt("return", (0, _lib.fail)(res, 500, "Error creating record. " + _context2.t0.message));

                    case 32:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, null, [[3, 28]]);
    }));

    return function createOtp(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

// eslint-disable-next-line complexity


var createRecord = exports.createRecord = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var data, user, _data, code, email, password, _data2, recipientArray, _data3, userId, _Joi$validate, error, myArray, sendingSms, resolvedFinalArray, result2;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        data = {};
                        user = {};

                        if (req.method === "POST") {
                            data = req.body;
                        } else {
                            data = req.query;
                        }
                        _data = data, code = _data.code, email = _data.email, password = _data.password;
                        _data2 = data, recipientArray = _data2.recipient;
                        _context4.prev = 5;
                        _data3 = data, userId = _data3.created_by;

                        if (!userId) {
                            _context4.next = 13;
                            break;
                        }

                        _context4.next = 10;
                        return _model4.default.findOne({ _id: userId }).exec();

                    case 10:
                        user = _context4.sent;
                        _context4.next = 17;
                        break;

                    case 13:
                        _context4.next = 15;
                        return _model4.default.findOne().or([{ api_key: code, api_access: true }, { email: email, password: password, api_access: true }]).exec();

                    case 15:
                        user = _context4.sent;

                        data.created_by = user._id;

                    case 17:
                        if (user) {
                            _context4.next = 19;
                            break;
                        }

                        return _context4.abrupt("return", (0, _lib.fail)(res, 403, "Authentication failed for " + code + " " + email));

                    case 19:
                        _Joi$validate = _joi2.default.validate(data, _model.schemaCreate), error = _Joi$validate.error;

                        if (!error) {
                            _context4.next = 22;
                            break;
                        }

                        return _context4.abrupt("return", (0, _lib.fail)(res, 422, "Error validating request data. " + error.message));

                    case 22:
                        myArray = (0, _lib.stringToArrayPhone)(recipientArray) || [];
                        sendingSms = myArray.length;

                        if (!(sendingSms > user.credit)) {
                            _context4.next = 26;
                            break;
                        }

                        return _context4.abrupt("return", (0, _lib.fail)(res, 422, "Error! You have " + user.credit + " units left. You cannot send " + sendingSms + " sms"));

                    case 26:
                        _context4.next = 28;
                        return Promise.all(myArray.map(function () {
                            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(phone) {
                                var send, newRecord, result;
                                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                    while (1) {
                                        switch (_context3.prev = _context3.next) {
                                            case 0:
                                                _context3.next = 2;
                                                return (0, _services.sendSmsAsync)(phone, data.message);

                                            case 2:
                                                send = _context3.sent;

                                                data.sid = send.sid;
                                                data.recipient = phone;
                                                newRecord = new _model2.default(data);
                                                _context3.next = 8;
                                                return newRecord.save();

                                            case 8:
                                                result = _context3.sent;
                                                return _context3.abrupt("return", result);

                                            case 10:
                                            case "end":
                                                return _context3.stop();
                                        }
                                    }
                                }, _callee3);
                            }));

                            return function (_x7) {
                                return _ref4.apply(this, arguments);
                            };
                        }() // important to return the value
                        ));

                    case 28:
                        resolvedFinalArray = _context4.sent;
                        _context4.next = 31;
                        return _model4.default.findOneAndUpdate({ _id: data.created_by }, { $inc: { credit: -sendingSms } }, { new: true });

                    case 31:
                        result2 = _context4.sent;

                        console.log(result2.credit);
                        return _context4.abrupt("return", (0, _lib.success)(res, 201, resolvedFinalArray, "Record created successfully!"));

                    case 36:
                        _context4.prev = 36;
                        _context4.t0 = _context4["catch"](5);

                        logger.error(_context4.t0);
                        return _context4.abrupt("return", (0, _lib.fail)(res, 500, "Error creating record. " + _context4.t0.message));

                    case 40:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, null, [[5, 36]]);
    }));

    return function createRecord(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

var createWebhook = exports.createWebhook = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var data;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        data = req.body;

                        (0, _services.receiveSms)(req, res);
                        logger.info("Operation was successful", data);

                    case 3:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5);
    }));

    return function createWebhook(_x8, _x9) {
        return _ref5.apply(this, arguments);
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
var logger = _log4js2.default.getLogger("[sms]");
_log4js2.default.configure({
    appenders: { file: { type: "file", filename: "logs/sms.log" } },
    categories: { default: { appenders: ["file"], level: "debug" } }
});
//# sourceMappingURL=controller.js.map