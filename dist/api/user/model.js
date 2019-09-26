"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.schema = exports.schemaUpdate = exports.schemaCreate = exports.schemaLogin = undefined;

var _joi = require("@hapi/joi");

var _joi2 = _interopRequireDefault(_joi);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = require("../../constants");

var _table = require("./table");

var _table2 = _interopRequireDefault(_table);

var _model = require("../notification/model");

var _model2 = _interopRequireDefault(_model);

var _model3 = require("../transaction/model");

var _model4 = _interopRequireDefault(_model3);

var _model5 = require("../ticket/model");

var _model6 = _interopRequireDefault(_model5);

var _helpers = require("../../lib/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var Schema = _mongoose2.default.Schema;
var ObjectId = Schema.Types.ObjectId;
var schemaLogin = exports.schemaLogin = _joi2.default.object({
    email: _joi2.default.string().email().optional(),
    phone: _joi2.default.string().optional(),
    otp: _joi2.default.string().optional(),
    password: _joi2.default.string().optional()
});

var schemaCreate = exports.schemaCreate = _joi2.default.object({
    type: _joi2.default.string().valid("CUSTOMER", "ADMIN").optional(),
    api_key: _joi2.default.string().trim().min(32).optional(),
    title: _joi2.default.string().optional(),
    surname: _joi2.default.string().optional(),
    given_name: _joi2.default.string().optional(),
    gender: _joi2.default.string().valid("MALE", "FEMALE").optional(),
    phone: _joi2.default.string().trim().optional(),
    phone_personal: _joi2.default.string().trim().optional(),
    address: _joi2.default.string().optional(),
    country_iso2: _joi2.default.string().optional(),
    email: _joi2.default.string().trim().email().optional(),
    password: _joi2.default.string().trim().optional(),
    created_by: _joi2.default.string().required()
});

var schemaUpdate = exports.schemaUpdate = _joi2.default.object({
    type: _joi2.default.string().valid("CUSTOMER", "ADMIN").optional(),
    api_key: _joi2.default.string().trim().min(32).optional(),
    api_access: _joi2.default.boolean().optional(),
    title: _joi2.default.string().optional(),
    surname: _joi2.default.string().optional(),
    given_name: _joi2.default.string().optional(),
    gender: _joi2.default.string().valid("MALE", "FEMALE").optional(),
    phone: _joi2.default.string().trim().optional(),
    phone_personal: _joi2.default.string().trim().optional(),
    address: _joi2.default.string().optional(),
    country_iso2: _joi2.default.string().optional(),
    email: _joi2.default.string().trim().email().optional(),
    password: _joi2.default.string().trim().optional(),
    otp: _joi2.default.string().trim().optional(),
    otp_count: _joi2.default.number().optional(),
    otp_access: _joi2.default.boolean().optional(),
    updated_by: _joi2.default.string().required()
});

var schema = exports.schema = {
    type: {
        type: String,
        enum: ["CUSTOMER", "ADMIN"],
        trim: true,
        uppercase: true,
        required: true,
        default: "CUSTOMER"
    },
    api_key: { type: String, trim: true, lowercase: true, unique: true },
    api_access: { type: Boolean, default: false },
    title: { type: String },
    surname: { type: String, required: [false, "Why no surname?"] },
    given_name: { type: String, required: [false, "Why no given_name?"] },
    gender: {
        type: String,
        enum: Object.values(_constants.GENDER),
        default: _constants.GENDER.MALE,
        required: [false, "Why no gender?"]
    },
    phone: {
        type: String,
        required: [false, "Why no offical phone?"],
        unique: true,
        alias: "phone_office"
    },
    phone_personal: {
        type: String,
        required: [false, "Why no personal phone?"],
        alias: "phone_home"
    },
    address: { type: String },
    country_iso2: { type: String, required: [false, "Why no input?"], default: "ng" },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        // eslint-disable-next-line no-useless-escape
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"]
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
    tickets: [{ type: ObjectId, ref: "Ticket" }],
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
    updated_by: { type: ObjectId, ref: "User" }
};

var preload = _constants.DATABASE.PRELOAD_TABLE_DATA.DEFAULT;
var options = _constants.DATABASE.OPTIONS;

var newSchema = new Schema(schema, options);
newSchema.index({ phone: 1, email: 1 }, { unique: true });
newSchema.set("collection", "user");

var User = _mongoose2.default.model("User", newSchema);

User.findOne({ email: "nditah@gmail.com" }).then(function (user) {
    if (!user) {
        console.log(_table2.default[0]);
        var newRecord = new User(_table2.default[0]);
        var newRecord2 = new User(_table2.default[1]);
        newRecord.save();
        newRecord2.save();
    }
}).catch(function (err) {
    return console.log(__dirname, err.message);
});

if (preload) {
    User.insertMany(_table2.default);
}

exports.default = User;
//# sourceMappingURL=model.js.map