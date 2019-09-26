/**
 * @author 4Dcoder
 * @property {Number} flwId Flutterwave flwId // 125837,
 * @property {String} txRef Flutterwave txRef // "rave-pos-272519815315",
 * @property {String} flwRef Flutterwave flwRef // "FLWACHMOCK-1523118279396",
 * @property {String} orderRef Flutterwave orderRef // "URF_1523118277202_7343035",
 * @property {String} paymentPlan Flutterwave paymentPlan // null,
 * @property {Date} flwCreatedAt Flutterwave flwCreatedAt // "2018-04-07T16:24:37.000Z",
 * @property {Number} amount Flutterwave amount // 200,
 * @property {Number} charged_amount Flutterwave charged_amount // 200,
 * @property {String} status Flutterwave status // "successful",
 * @property {String} IP Flutterwave IP // "197.149.95.62",
 * @property {String} currency Flutterwave currency // "NGN",
 * @property {Object} customer Flutterwave customer Object {
 *      {Number} id customer id // 5766,
 *      {String} phone customer phone , // "N/A",
 *      {String} fullName customer phone , // "Anonymous customer",
 *      {String} customertoken customer phone , // null,
 *      {String} email customer phone , // "salesmode@ravepay.co",
 *      {Date} createdAt customer phone , // "2017-10-16T10:03:19.000Z",
 *      {Date} updatedAt customer phone , // "2017-10-16T10:03:19.000Z",
 *      {Date} deletedAt customer phone , // null,
 *      {Number} AccountId customer phone , // 134,
 *      },
 * @property {Object} entity Flutterwave entity Object {
 *      {String} account_number entity , // "0690000037",
 *      {String} first_name entity , // "Dele Moruf",
 *      {String} last_name entity , // "Quadri",
 *      {String} card6 entity , // "539983",
 *      {String} card_last4 entity , // "8381",
 *      },
 * @description Flutterwave model holds record of all transactions through 3rd party
 * payment gateway like InterSwitch, Flutterwave, Paystack, Paypal. It mainly has the
 * webhook for flutterwave payment for now.
 */
import Joi from "@hapi/joi";
import mongoose from "mongoose";
// eslint-disable-next-line camelcase
import { DATABASE } from "../../constants";
import User from "../user/model";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export const schemaCreate = {
    flwId: Joi.number().optional(),
    txRef: Joi.string().optional(),
    flwRef: Joi.string().optional(),
    orderRef: Joi.string().optional(),
    paymentPlan: Joi.string().optional(),
    flwCreatedAt: Joi.date().optional(),
    amount: Joi.number().optional(),
    charged_amount: Joi.number().optional(),
    status: Joi.string().optional(),
    IP: Joi.string().optional(),
    currency: Joi.string().optional(),
    customer: Joi.object().optional(),
    entity: Joi.object().optional(),
    created_by: Joi.string().optional(),
    pushable: Joi.boolean().optional(),
    pullable: Joi.boolean().optional(),
};

export const schemaUpdate = {
    flwId: Joi.number().optional(),
    txRef: Joi.string().optional(),
    flwRef: Joi.string().optional(),
    orderRef: Joi.string().optional(),
    paymentPlan: Joi.string().optional(),
    flwCreatedAt: Joi.date().optional(),
    amount: Joi.number().optional(),
    charged_amount: Joi.number().optional(),
    status: Joi.string().optional(),
    IP: Joi.string().optional(),
    currency: Joi.string().optional(),
    customer: Joi.object().optional(),
    entity: Joi.object().optional(),
    updated_by: Joi.string().required(),
    pushable: Joi.boolean().optional(),
    pullable: Joi.boolean().optional(),
};

export const schema = {
    flwId: { type: Number }, // 125837,
    txRef: { type: String }, // "rave-pos-272519815315",
    flwRef: { type: String }, // "FLWACHMOCK-1523118279396",
    orderRef: { type: String }, // "URF_1523118277202_7343035",
    paymentPlan: { type: String }, // null,
    flwCreatedAt: { type: Date }, // "2018-04-07T16:24:37.000Z",
    amount: { type: Number }, // 200,
    charged_amount: { type: Number }, // 200,
    status: { type: String }, // "successful",
    IP: { type: String }, // "197.149.95.62",
    currency: { type: String }, // "NGN",
    customer: {
        id: { type: Number }, // 5766,
        phone: { type: String }, // "N/A",
        fullName: { type: String }, // "Anonymous customer",
        customertoken: { type: String }, // null,
        email: { type: String }, // "salesmode@ravepay.co",
        createdAt: { type: Date }, // "2017-10-16T10:03:19.000Z",
        updatedAt: { type: Date }, // "2017-10-16T10:03:19.000Z",
        deletedAt: { type: Date }, // null,
        AccountId: { type: Number }, // 134,
    },
    entity: {
        account_number: { type: String }, // "0690000037",
        first_name: { type: String }, // "Dele Moruf",
        last_name: { type: String }, // "Quadri",
        card6: { type: String }, // "539983",
        card_last4: { type: String }, // "8381",
    },
    created_by: { type: ObjectId },
    updated_by: { type: ObjectId, ref: "Staff" },
    deleted: { type: Boolean },
    deleted_at: { type: Date },
    deleted_by: { type: ObjectId, ref: "Staff" },
    pushable: { type: Boolean, default: false }, // Created Offline
    pullable: { type: Boolean, default: false }, // Created Online
};

const options = DATABASE.OPTIONS;

const newSchema = new Schema(schema, options);
newSchema.set("collection", "flutterwave");

const Flutterwave = mongoose.model("Flutterwave", newSchema);

export default Flutterwave;
