"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.userAuthenticate2 = undefined;

// eslint-disable-next-line complexity
var userAuthenticate2 = exports.userAuthenticate2 = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(loginPayload) {
        var email, phone, password, type, user, token, payload;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        // return next();
                        email = loginPayload.email, phone = loginPayload.phone, password = loginPayload.password, type = loginPayload.type;
                        user = void 0;
                        token = void 0;
                        _context.prev = 3;
                        _context.next = 6;
                        return _model2.default.findOne({ $or: [{ email: email }, { phone: phone }] }).exec();

                    case 6:
                        user = _context.sent;

                        if (user) {
                            _context.next = 9;
                            break;
                        }

                        throw new Error("User not found.");

                    case 9:
                        if (_bcryptjs2.default.compareSync(password || "", user.password)) {
                            _context.next = 11;
                            break;
                        }

                        throw new Error("Wrong credentials.");

                    case 11:
                        // Delete private attributes
                        user.password = null;
                        payload = { id: user.id, type: type, email: email, phone: phone, time: new Date() };

                        token = _jsonwebtoken2.default.sign(payload, _constants.JWT.jwtSecret, { expiresIn: _constants.JWT.tokenExpireTime });
                        _context.next = 19;
                        break;

                    case 16:
                        _context.prev = 16;
                        _context.t0 = _context["catch"](3);
                        throw new Error("Authentication failed " + _context.t0.message);

                    case 19:
                        return _context.abrupt("return", { token: token, user: user });

                    case 20:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, null, [[3, 16]]);
    }));

    return function userAuthenticate2(_x) {
        return _ref.apply(this, arguments);
    };
}();

exports.userAuthenticate = userAuthenticate;

var _bcryptjs = require("bcryptjs");

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _model = require("../api/user/model");

var _model2 = _interopRequireDefault(_model);

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function userAuthenticate(loginPayload) {
    console.log(loginPayload);
    var email = loginPayload.email,
        phone = loginPayload.phone,
        password = loginPayload.password;

    return _model2.default.findOne({ $or: [{ email: email }, { phone: phone }] })
    // eslint-disable-next-line complexity
    .then(function (user) {
        if (!user) {
            throw new Error("User not found.");
        }
        if (!_bcryptjs2.default.compareSync(password || "", user.password)) {
            throw new Error("Wrong password.");
        }
        // Delete private attributes
        user.password = null;
        var payload = {
            id: user.id,
            type: user.type,
            email: email,
            phone: phone,
            credit: user.credit
        };
        var token = _jsonwebtoken2.default.sign(payload, _constants.JWT.jwtSecret);
        return { token: token, user: user };
    }).catch(function (err) {
        throw new Error(err.message);
    });
}
//# sourceMappingURL=authenticate.js.map