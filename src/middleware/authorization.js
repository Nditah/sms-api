import { verify } from "jsonwebtoken";
import { JWT } from "../constants";
import { fail } from "../lib/response";
import { hasProp } from "../lib/helpers";

// Retrieve token from request header
export function getToken(req) {
    if (req.headers.authorization && req.headers.authorization.split(" ")[ 0 ] === "Bearer") {
        return req.headers.authorization.split(" ")[ 1 ];
    } if (req.query && hasProp(req.query, "token")) {
        return req.query.token;
    }
    return null;
}

export function checkAuth(req, res, next) {
    const token = getToken(req);
    if (!token) return fail(res, 403, "No token found in request header!");
    return verify(token, JWT.jwtSecret, (err, decoded) => {
        if (err) return fail(res, 403, "Failed to authenticate token.!");
        req.user = {
            id: decoded.id,
            type: decoded.type,
            email: decoded.email,
            phone: decoded.phone,
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

export function isValidUser(req, res, next) {
    const { type, id, email } = req.user;
    if (!(type === "CUSTOMER" || type === "ADMIN")) return fail(res, 403, "Invalid User credentials!");
    console.log("\nValidating User: ", type, id, email);
    return next();
}

export function isValidCustomer(req, res, next) {
    const { type, id, email } = req.user;
    if (type !== "CUSTOMER") return fail(res, 403, "Invalid Customer credentials!");
    console.log("\nValidating Customer: ", type, id, email);
    return next();
}

export function isValidAdmin(req, res, next) {
    const { type, id, email } = req.user;
    if (type !== "ADMIN") return fail(res, 403, "Invalid Admin credentials!");
    console.log("\nValidating Admin: ", type, id, email);
    return next();
}
