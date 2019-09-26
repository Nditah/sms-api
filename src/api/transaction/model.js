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
import Joi from "@hapi/joi";
import mongoose from "mongoose";
import { DATABASE, PAYMENT } from "../../constants";
// eslint-disable-next-line import/no-cycle
import User from "../user/model";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export const schemaCreate = Joi.object({
    user: Joi.string().required(),
    amount: Joi.number().required(),
    code: Joi.string().trim().required(),
    gateway_details: Joi.object().optional(),
    sms_units: Joi.number().required(),
    payment_method: Joi.string().valid("GATEWAY", "POS", "CASH", "CHEQUE", "TRANSFER", "USSD").required(),
    payment_gateway: Joi.string().valid("FLUTTERWAVE", "INTERSWITCH", "UNIONBANK", "PAYSTACK", "STRIPE", "PAYPAL", "GOOGLE_WALLET").required(),
    payment_status: Joi.string().valid("PENDING", "SUCCESSFUL", "FAIL").required(),
    description: Joi.string().optional(),
    created_by: Joi.string().required(),
});

export const schemaUpdate = Joi.object({
    user: Joi.string().optional(),
    amount: Joi.number().optional(),
    code: Joi.string().trim().optional(),
    gateway_details: Joi.object().optional(),
    sms_units: Joi.number().optional(),
    payment_method: Joi.string().valid("GATEWAY", "POS", "CASH", "CHEQUE", "TRANSFER", "USSD").optional(),
    payment_gateway: Joi.string().valid("FLUTTERWAVE", "INTERSWITCH", "UNIONBANK", "PAYSTACK", "STRIPE", "PAYPAL", "GOOGLE_WALLET").optional(),
    payment_status: Joi.string().valid("PENDING", "SUCCESSFUL", "FAIL").optional(),
    description: Joi.string().optional(),
    credit_status: Joi.string().valid("PENDING", "CREDITED", "REJECTED").optional(),
    updated_by: Joi.string().required(),
});

export const schema = {
    user: { type: ObjectId, required: true, ref: "User" },
    amount: { type: Number, required: [true, "Why no amount?"] },
    code: { type: String, alias: "trxref", uppercase: true, unique: true, required: true },
    gateway_details: {
        id: { type: Number },
        charged_amount: { type: Number },
        accountId: { type: Number },
        userId: { type: Number },
        currency: { type: String },
    },
    sms_units: { type: Number, required: [true, "Why no sms units?"] },
    payment_method: {
        type: String,
        enum: Object.values(PAYMENT.METHOD),
        required: [true, "Why no payment_method?"],
        default: PAYMENT.METHOD.CASH,
    },
    payment_gateway: {
        type: String,
        enum: Object.values(PAYMENT.GATEWAY),
        required: [true, "Why no payment_method?"],
        default: PAYMENT.GATEWAY.FLUTTERWAVE,
    },
    payment_status: {
        type: String,
        enum: Object.values(PAYMENT.STATUS),
        required: [true, "Why no payment_status?"],
        default: PAYMENT.STATUS.PENDING,
    },
    description: { type: String },
    credit_status: {
        type: String,
        enum: ["PENDING", "CREDITED", "REJECTED"],
        required: [true, "Why no credit_status?"],
        default: "PENDING",
    },
    created_by: { type: ObjectId, ref: "User", required: true },
    updated_by: { type: ObjectId, ref: "User" },
};
const options = DATABASE.OPTIONS;

const newSchema = new Schema(schema, options);
newSchema.set("collection", "transaction");

const Transaction = mongoose.model("Transaction", newSchema);

export default Transaction;
