import { verify } from "jsonwebtoken";
import { JWT } from "../constants";
import { fail } from "../lib/response";
import { hasProp } from "../lib/helpers";
import User from "../api/user/model";

// Retrieve token from request header
export function getToken(req) {
    if (req.headers.authorization && req.headers.authorization.split(" ")[ 0 ] === "Bearer") {
        return req.headers.authorization.split(" ")[ 1 ];
    } if (req.query && hasProp(req.query, "token")) {
        return req.query.token;
    }
    return null;
}

// eslint-disable-next-line complexity
export async function checkAuth(req, res, next) {
    const { code, email, password } = req.query;
    const apiKey = code ? code.toLowerCase() : "";
    const token = getToken(req);
    if (!token) {
        const user = await User.findOne().or([
            { api_key: apiKey, api_access: true },
            { email, password, api_access: true },
        ]).exec();
        if (!user) return fail(res, 403, "No token found in request header!");
        req.user = {
            id: user._id,
            type: user.type,
            email: user.email,
            phone: user.phone,
            credit: user.credit,
        };
        if (req.method === "POST" && (code || email)) {
            req.body.created_by = `${req.user.id}`;
        } else if (req.method === "PUT" && (code || email)) {
            req.body.updated_by = `${req.user.id}`;
        }
        return next();
    }
    return verify(token, JWT.jwtSecret, (err, decoded) => {
        if (err) return fail(res, 403, "Failed to authenticate token.!");
        req.user = {
            id: decoded.id,
            type: decoded.type,
            email: decoded.email,
            phone: decoded.phone,
            credit: decoded.credit,
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
    console.log("Validating User: ", type, id, email);
    return next();
}

export function isValidCustomer(req, res, next) {
    const { type, id, email } = req.user;
    if (type !== "CUSTOMER") return fail(res, 403, "Invalid Customer credentials!");
    console.log("Validating Customer: ", type, id, email);
    return next();
}

export function isValidAdmin(req, res, next) {
    const { type, id, email } = req.user;
    if (type !== "ADMIN") return fail(res, 403, "Invalid Admin credentials!");
    console.log("Validating Admin: ", type, id, email);
    return next();
}
