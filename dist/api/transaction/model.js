"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.schema = exports.schemaUpdate = exports.schemaCreate = undefined;

var _joi = require("joi");

var _joi2 = _interopRequireDefault(_joi);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = require("../../constants");

var _model = require("../user/model");

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author 4Dcoder
 * @property {String} user transaction reference txRef (required)
 * @property {Number} amount Transaction amount paid (required)
 * @property {String} code transaction reference txRef (required)
 * @property {String} gateway_details transaction response Object (required)
 * @property {Number} sms_units Transaction sms_units (required)
 * @property {String} payment_method Transaction payment method GATEWAY (required)
 * @property {String} payment_gateway Transaction payment gateway FLUTTERWAVE (required)
 * @property {String} payment_status Transaction transaction status (prohibited)
 * @property {String} description Transaction description(optional)
 * @property {String} credit_status Transaction credit status (prohibited)
 * @description Transaction model holds record of all banks transactions records
 */
var Schema = _mongoose2.default.Schema;
// eslint-disable-next-line import/no-cycle

var ObjectId = Schema.Types.ObjectId;
var schemaCreate = exports.schemaCreate = {
    user: _joi2.default.string().required(),
    amount: _joi2.default.number().required(),
    code: _joi2.default.string().trim().required(),
    gateway_details: _joi2.default.object().optional(),
    sms_units: _joi2.default.number().required(),
    payment_method: _joi2.default.string().valid(Object.values(_constants.PAYMENT.METHOD)).required(),
    payment_gateway: _joi2.default.string().valid(Object.values(_constants.PAYMENT.GATEWAY)).required(),
    payment_status: _joi2.default.string().valid(Object.values(_constants.PAYMENT.STATUS)).required(),
    description: _joi2.default.string().optional(),
    created_by: _joi2.default.string().required()
};

var schemaUpdate = exports.schemaUpdate = {
    user: _joi2.default.string().optional(),
    amount: _joi2.default.number().optional(),
    code: _joi2.default.string().trim().optional(),
    gateway_details: _joi2.default.object().optional(),
    sms_units: _joi2.default.number().optional(),
    payment_method: _joi2.default.string().valid(Object.values(_constants.PAYMENT.METHOD)).optional(),
    payment_gateway: _joi2.default.string().valid(Object.values(_constants.PAYMENT.GATEWAY)).optional(),
    payment_status: _joi2.default.string().valid(Object.values(_constants.PAYMENT.STATUS)).optional(),
    description: _joi2.default.string().optional(),
    credit_status: _joi2.default.string().valid(["PENDING", "CREDITED", "REJECTED"]).optional(),
    updated_by: _joi2.default.string().required()
};

var schema = exports.schema = {
    user: { type: ObjectId, required: true, ref: "User" },
    amount: { type: Number, required: [true, "Why no amount?"] },
    code: { type: String, alias: "trxref", uppercase: true, unique: true, required: true },
    gateway_details: {
        id: { type: Number },
        charged_amount: { type: Number },
        accountId: { type: Number },
        userId: { type: Number },
        currency: { type: String }
    },
    sms_units: { type: Number, required: [true, "Why no sms units?"] },
    payment_method: {
        type: String,
        enum: Object.values(_constants.PAYMENT.METHOD),
        required: [true, "Why no payment_method?"],
        default: _constants.PAYMENT.METHOD.CASH
    },
    payment_gateway: {
        type: String,
        enum: Object.values(_constants.PAYMENT.GATEWAY),
        required: [true, "Why no payment_method?"],
        default: _constants.PAYMENT.GATEWAY.FLUTTERWAVE
    },
    payment_status: {
        type: String,
        enum: Object.values(_constants.PAYMENT.STATUS),
        required: [true, "Why no payment_status?"],
        default: _constants.PAYMENT.STATUS.PENDING
    },
    description: { type: String },
    credit_status: {
        type: String,
        enum: ["PENDING", "CREDITED", "REJECTED"],
        required: [true, "Why no credit_status?"],
        default: "PENDING"
    },
    created_by: { type: ObjectId, ref: "User", required: true },
    updated_by: { type: ObjectId, ref: "User" }
};
var options = _constants.DATABASE.OPTIONS;

var newSchema = new Schema(schema, options);
newSchema.set("collection", "transaction");

var Transaction = _mongoose2.default.model("Transaction", newSchema);

exports.default = Transaction;
//# sourceMappingURL=model.js.map