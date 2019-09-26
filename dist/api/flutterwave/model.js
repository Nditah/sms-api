"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.schema = exports.schemaUpdate = exports.schemaCreate = undefined;

var _joi = require("@hapi/joi");

var _joi2 = _interopRequireDefault(_joi);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = require("../../constants");

var _model = require("../user/model");

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line camelcase
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
var Schema = _mongoose2.default.Schema;
var ObjectId = Schema.Types.ObjectId;
var schemaCreate = exports.schemaCreate = {
    flwId: _joi2.default.number().optional(),
    txRef: _joi2.default.string().optional(),
    flwRef: _joi2.default.string().optional(),
    orderRef: _joi2.default.string().optional(),
    paymentPlan: _joi2.default.string().optional(),
    flwCreatedAt: _joi2.default.date().optional(),
    amount: _joi2.default.number().optional(),
    charged_amount: _joi2.default.number().optional(),
    status: _joi2.default.string().optional(),
    IP: _joi2.default.string().optional(),
    currency: _joi2.default.string().optional(),
    customer: _joi2.default.object().optional(),
    entity: _joi2.default.object().optional(),
    created_by: _joi2.default.string().optional(),
    pushable: _joi2.default.boolean().optional(),
    pullable: _joi2.default.boolean().optional()
};

var schemaUpdate = exports.schemaUpdate = {
    flwId: _joi2.default.number().optional(),
    txRef: _joi2.default.string().optional(),
    flwRef: _joi2.default.string().optional(),
    orderRef: _joi2.default.string().optional(),
    paymentPlan: _joi2.default.string().optional(),
    flwCreatedAt: _joi2.default.date().optional(),
    amount: _joi2.default.number().optional(),
    charged_amount: _joi2.default.number().optional(),
    status: _joi2.default.string().optional(),
    IP: _joi2.default.string().optional(),
    currency: _joi2.default.string().optional(),
    customer: _joi2.default.object().optional(),
    entity: _joi2.default.object().optional(),
    updated_by: _joi2.default.string().required(),
    pushable: _joi2.default.boolean().optional(),
    pullable: _joi2.default.boolean().optional()
};

var schema = exports.schema = {
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
        AccountId: { type: Number } // 134,
    },
    entity: {
        account_number: { type: String }, // "0690000037",
        first_name: { type: String }, // "Dele Moruf",
        last_name: { type: String }, // "Quadri",
        card6: { type: String }, // "539983",
        card_last4: { type: String } // "8381",
    },
    created_by: { type: ObjectId },
    updated_by: { type: ObjectId, ref: "Staff" },
    deleted: { type: Boolean },
    deleted_at: { type: Date },
    deleted_by: { type: ObjectId, ref: "Staff" },
    pushable: { type: Boolean, default: false }, // Created Offline
    pullable: { type: Boolean, default: false } // Created Online
};

var options = _constants.DATABASE.OPTIONS;

var newSchema = new Schema(schema, options);
newSchema.set("collection", "flutterwave");

var Flutterwave = _mongoose2.default.model("Flutterwave", newSchema);

exports.default = Flutterwave;
//# sourceMappingURL=model.js.map