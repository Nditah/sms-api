"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getToken = getToken;
exports.checkAuth = checkAuth;
exports.isValidUser = isValidUser;
exports.isValidCustomer = isValidCustomer;
exports.isValidAdmin = isValidAdmin;

var _jsonwebtoken = require("jsonwebtoken");

var _constants = require("../constants");

var _response = require("../lib/response");

var _helpers = require("../lib/helpers");

// Retrieve token from request header
function getToken(req) {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        return req.headers.authorization.split(" ")[1];
    }if (req.query && (0, _helpers.hasProp)(req.query, "token")) {
        return req.query.token;
    }
    return null;
}

function checkAuth(req, res, next) {
    var token = getToken(req);
    if (!token) return (0, _response.fail)(res, 403, "No token found in request header!");
    return (0, _jsonwebtoken.verify)(token, _constants.JWT.jwtSecret, function (err, decoded) {
        if (err) return (0, _response.fail)(res, 403, "Failed to authenticate token.!");
        req.user = {
            id: decoded.id,
            type: decoded.type,
            email: decoded.email,
            phone: decoded.phone
        };
        if (req.method === "POST") {
            req.body.created_by = decoded.id;
        } else if (req.method === "PUT") {
            req.body.updated_by = decoded.id;
        }
        return next();
    });
}

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

function isValidUser(req, res, next) {
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