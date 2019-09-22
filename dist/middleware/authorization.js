"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkAuth = undefined;

// eslint-disable-next-line complexity
var checkAuth = exports.checkAuth = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        var _req$query, code, email, password, apiKey, token, user;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _req$query = req.query, code = _req$query.code, email = _req$query.email, password = _req$query.password;
                        apiKey = code ? code.toLowerCase() : "";
                        token = getToken(req);

                        if (token) {
                            _context.next = 12;
                            break;
                        }

                        _context.next = 6;
                        return _model2.default.findOne().or([{ api_key: apiKey, api_access: true }, { email: email, password: password, api_access: true }]).exec();

                    case 6:
                        user = _context.sent;

                        if (user) {
                            _context.next = 9;
                            break;
                        }

                        return _context.abrupt("return", (0, _response.fail)(res, 403, "No token found in request header!"));

                    case 9:
                        req.user = {
                            id: user._id,
                            type: user.type,
                            email: user.email,
                            phone: user.phone,
                            credit: user.credit
                        };
                        if (req.method === "POST" && (code || email)) {
                            req.body.created_by = "" + req.user.id;
                        } else if (req.method === "PUT" && (code || email)) {
                            req.body.updated_by = "" + req.user.id;
                        }
                        return _context.abrupt("return", next());

                    case 12:
                        return _context.abrupt("return", (0, _jsonwebtoken.verify)(token, _constants.JWT.jwtSecret, function (err, decoded) {
                            if (err) return (0, _response.fail)(res, 403, "Failed to authenticate token.!");
                            req.user = {
                                id: decoded.id,
                                type: decoded.type,
                                email: decoded.email,
                                phone: decoded.phone,
                                credit: decoded.credit
                            };
                            if (req.method === "POST") {
                                req.body.created_by = decoded.id;
                            } else if (req.method === "PUT") {
                                req.body.updated_by = decoded.id;
                            }
                            return next();
                        }));

                    case 13:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee);
    }));

    return function checkAuth(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

/*
export function getUser(req) {
    let user = "";
    Promise(resolve, reject) {
        try {
            const token = getToken(req);
            return verify(token, JWT.jwtSecret, (err, decoded) => {
                user = { decoded };
                resolve(user);
            });
        } catch(err){
            reject(err);
        }
    }
}
*/

exports.getToken = getToken;
exports.isValidUser = isValidUser;
exports.isValidCustomer = isValidCustomer;
exports.isValidAdmin = isValidAdmin;

var _jsonwebtoken = require("jsonwebtoken");

var _constants = require("../constants");

var _response = require("../lib/response");

var _helpers = require("../lib/helpers");

var _model = require("../api/user/model");

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Retrieve token from request header
function getToken(req) {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        return req.headers.authorization.split(" ")[1];
    }if (req.query && (0, _helpers.hasProp)(req.query, "token")) {
        return req.query.token;
    }
    return null;
}function isValidUser(req, res, next) {
    var _req$user = req.user,
        type = _req$user.type,
        id = _req$user.id,
        email = _req$user.email;

    if (!(type === "CUSTOMER" || type === "ADMIN")) return (0, _response.fail)(res, 403, "Invalid User credentials!");
    console.log("\nValidating User: ", type, id, email);
    return next();
}

function isValidCustomer(req, res, next) {
    var _req$user2 = req.user,
        type = _req$user2.type,
        id = _req$user2.id,
        email = _req$user2.email;

    if (type !== "CUSTOMER") return (0, _response.fail)(res, 403, "Invalid Customer credentials!");
    console.log("\nValidating Customer: ", type, id, email);
    return next();
}

function isValidAdmin(req, res, next) {
    var _req$user3 = req.user,
        type = _req$user3.type,
        id = _req$user3.id,
        email = _req$user3.email;

    if (type !== "ADMIN") return (0, _response.fail)(res, 403, "Invalid Admin credentials!");
    console.log("\nValidating Admin: ", type, id, email);
    return next();
}
//# sourceMappingURL=authorization.js.map