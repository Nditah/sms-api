/* eslint-disable import/no-cycle */
/**
 * @author 4Deapi_keyr
 * @property {String} id User ObjectId primaryKey
 * @property {String} type User type (optional)
 * @property {String} api_key User api access key (prohibited)
 * @property {Boolean} api_access User api_access (optional)
 * @property {String} title User title (optional)
 * @property {String} surname User surname (required)
 * @property {String} given_name User given_name (required)
 * @property {String} gender User gender (required)
 * @property {String} phone User office phone (required)
 * @property {String} phone_personal User phone_personal (optional)
 * @property {String} address User address (optional)
 * @property {String} country_iso2 User country_iso2 (optional)
 * @property {String} email User email (optional)
 * @property {String} password User password (optional)
 * @property {String} otp User otp (optional)
 * @property {Number} otp_count User otp_count (optional)
 * @property {Boolean} otp_access User otp_access (optional)
 * @property {Number} credit User credit (optional)
 * @property {Array} notifications User notifications (optional)
 * @property {String} remark User remark (optional)
 * @property {Boolean} deleted User deleted (prohibited)
 * @property {Date} deleted_at User deleted_at (prohibited)
 * @property {String} deleted_by User deleted_by (prohibited)
 * @property {Boolean} blocked User blocked (prohibited)
 * @property {Date} blocked_at User blocked_at (prohibited)
 * @property {String} blocked_by User blocked_by (prohibited)
 * @property {Date} last_login User last_login (prohibited)
 * @property {String} last_ip User last_ip (prohibited)
 * @property {String} created_by User record created by
 * @property {String} updated_by User record modified by
 * @description User holds record of all cities with school_list
 */
import Joi from "joi";
import mongoose from "mongoose";
import { DATABASE, GENDER } from "../../constants";
import table from "./table";
import Notification from "../notification/model";
import Transaction from "../transaction/model";
import { genCode } from "../../lib/helpers";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export const schemaLogin = {
    email: Joi.string().trim().email().optional(),
    phone: Joi.string().optional(),
    otp: Joi.string().optional(),
    password: Joi.string().optional(),
    type: Joi.string().valid(["EMAIL", "PHONE", "OTP"]).optional(),
};

export const schemaCreate = {
    type: Joi.string().valid(["CUSTOMER", "ADMIN"]).optional(),
    title: Joi.string().optional(),
    surname: Joi.string().optional(),
    given_name: Joi.string().optional(),
    gender: Joi.string().valid(["MALE", "FEMALE"]).optional(),
    phone: Joi.string().trim().optional(),
    phone_personal: Joi.string().trim().optional(),
    address: Joi.string().optional(),
    country_iso2: Joi.string().optional(),
    email: Joi.string().trim().email().optional(),
    password: Joi.string().trim().optional(),
    created_by: Joi.string().required(),
};

export const schemaUpdate = {
    type: Joi.string().valid(["CUSTOMER", "ADMIN"]).optional(),
    api_key: Joi.string().trim().optional(),
    api_access: Joi.boolean().optional(),
    title: Joi.string().optional(),
    surname: Joi.string().optional(),
    given_name: Joi.string().optional(),
    gender: Joi.string().valid(["MALE", "FEMALE"]).optional(),
    phone: Joi.string().trim().optional(),
    phone_personal: Joi.string().trim().optional(),
    address: Joi.string().optional(),
    country_iso2: Joi.string().optional(),
    email: Joi.string().trim().email().optional(),
    password: Joi.string().trim().optional(),
    otp: Joi.string().trim().optional(),
    otp_count: Joi.number().optional(),
    otp_access: Joi.boolean().optional(),
    updated_by: Joi.string().required(),
};

export const schema = {
    type: {
        type: String,
        enum: ["CUSTOMER", "ADMIN"],
        trim: true,
        uppercase: true,
        required: true,
        default: "CUSTOMER",
    },
    api_key: { type: String, trim: true, lowercase: true, unique: true },
    api_access: { type: Boolean, default: false },
    title: { type: String },
    surname: { type: String, required: [false, "Why no surname?"] },
    given_name: { type: String, required: [false, "Why no given_name?"] },
    gender: {
        type: String,
        enum: Object.values(GENDER),
        default: GENDER.MALE,
        required: [false, "Why no gender?"],
    },
    phone: {
        type: String,
        required: [false, "Why no offical phone?"],
        unique: true,
        alias: "phone_office",
    },
    phone_personal: {
        type: String,
        required: [false, "Why no personal phone?"],
        alias: "phone_home",
    },
    address: { type: String },
    country_iso2: { type: String, required: [false, "Why no input?"], default: "ng" },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        // eslint-disable-next-line no-useless-escape
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address"],
    },
    password: { type: String },
    confirmed_email: { type: Boolean, default: false },
    confirmed_phone: { type: Boolean, default: false },
    otp: { type: String },
    otp_count: { type: Number, required: [false, "Why no input?"], default: 0 },
    otp_access: { type: Boolean, default: false },
    credit: { type: Number, default: 2.0 }, // SMS Unit
    notifications: [{ type: ObjectId, ref: "Notification" }],
    transactions: [{ type: ObjectId, ref: "Transaction" }],
    remark: { type: String },
    deleted: { type: Boolean, default: false, required: true },
    deleted_at: { type: Date },
    deleted_by: { type: ObjectId, ref: "User" },
    blocked: { type: Boolean, default: false, required: true },
    blocked_at: { type: Date },
    blocked_by: { type: ObjectId, ref: "User" },
    last_login: { type: Date },
    last_ip: { type: String },
    created_by: { type: ObjectId, ref: "User" },
    updated_by: { type: ObjectId, ref: "User" },
};

const preload = DATABASE.PRELOAD_TABLE_DATA.DEFAULT;
const options = DATABASE.OPTIONS;

const newSchema = new Schema(schema, options);
newSchema.index({ phone: 1, email: 1 }, { unique: true });
newSchema.set("collection", "user");

const User = mongoose.model("User", newSchema);

User.findOne({ email: "nditah@gmail.com" })
    .then((user) => {
        if (!user) {
            console.log(table[ 0 ]);
            const newRecord = new User(table[ 0 ]);
            const newRecord2 = new User(table[ 1 ]);
            newRecord.save();
            newRecord2.save();
        }
    })
    .catch(err => console.log(__dirname, err.message));

if (preload) { User.insertMany(table); }

export default User;
