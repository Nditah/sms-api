import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../api/user/model";
import { JWT } from "../constants";

export function userAuthenticate(loginPayload) {
    console.log(loginPayload);
    const { email, phone, password } = loginPayload;
    return User.findOne({ $or: [{ email }, { phone }] })
        // eslint-disable-next-line complexity
        .then((user) => {
            if (!user) { throw new Error("User not found."); }
            if (!(bcryptjs.compareSync(password || "", user.password))) {
                throw new Error("Wrong password.");
            }
            // Delete private attributes
            user.password = null;
            const payload = {
                id: user.id,
                type: user.type,
                email,
                phone,
                credit: user.credit,
            };
            const token = jwt.sign(payload, JWT.jwtSecret);
            return { token, user };
        }).catch((err) => {
            throw new Error(err.message);
        });
}

// eslint-disable-next-line complexity
export async function userAuthenticate2(loginPayload) {
    // return next();
    const { email, phone, password, type } = loginPayload;
    let user;
    let token;
    try {
        user = await User.findOne({ $or: [{ email }, { phone }] }).exec();
        if (!user) {
            throw new Error("User not found.");
        }
        if (!(bcryptjs.compareSync(password || "", user.password))) {
            throw new Error("Wrong credentials.");
        }
        // Delete private attributes
        user.password = null;
        const payload = { id: user.id, type, email, phone, time: new Date() };
        token = jwt.sign(payload, JWT.jwtSecret, { expiresIn: JWT.tokenExpireTime });
    } catch (err) {
        throw new Error(`Authentication failed ${err.message}`);
    }
    return { token, user };
}
