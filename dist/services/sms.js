"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var sendSmsAsync = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(recipient, message) {
        var data, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (sender && recipient && message) {
                            _context.next = 2;
                            break;
                        }

                        throw new Error("Invalid sendSmsAsync params");

                    case 2:
                        _context.prev = 2;
                        data = {
                            from: formatPhone(sender),
                            body: message,
                            to: formatPhone(recipient)
                        };
                        _context.next = 6;
                        return client.messages.create(data);

                    case 6:
                        result = _context.sent;
                        return _context.abrupt("return", result);

                    case 10:
                        _context.prev = 10;
                        _context.t0 = _context["catch"](2);
                        return _context.abrupt("return", _context.t0);

                    case 13:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, null, [[2, 10]]);
    }));

    return function sendSmsAsync(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * Twilio Webhook for receiving sms
 * Receive message via this webhook set at the twilio user settings
 */


var receiveSms = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var twiml, message;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        twiml = new twilio.TwimlResponse();

                        twiml.message("Twilio incoming message:");
                        message = twiml.toString();

                        res.send(message);

                    case 4:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2);
    }));

    return function receiveSms(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

// Read Multiple SMS Records


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var twilio = require("twilio");
var dotenv = require("dotenv");

var _require = require("../constants"),
    SMS = _require.SMS;

//  * https://www.twilio.com/docs/sms/api/message-resource#read-multiple-message-resources

dotenv.config();

var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
// eslint-disable-next-line new-cap
var client = new twilio(accountSid, authToken);
var sender = SMS.SENDER;

function formatPhone(phone) {
    if (!phone) return null;
    var str = phone.trim();
    if (str.length === 11 && str[0] === "0") {
        str = "+234" + str.slice(1);
    }
    if (str.length === 10) {
        str = "+234" + str;
    }
    return str;
}

function sendSms(recipient, message) {
    if (!(sender && recipient && message)) throw new Error("Invalid sendSms params");
    var data = {
        from: formatPhone(sender),
        body: message,
        to: formatPhone(recipient)
    };
    client.messages.create(data).then(function (result) {
        return console.log(result.sid);
    }).catch(function (err) {
        return console.error(err);
    });
}

function readMultipleSms() {
    client.messages.each(function (messages) {
        return console.log(messages.sid);
    });
}

exports.sendSms = sendSms;
exports.sendSmsAsync = sendSmsAsync;
exports.receiveSms = receiveSms;
exports.readMultipleSms = readMultipleSms;
//# sourceMappingURL=sms.js.map