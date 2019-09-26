"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.schema = exports.schemaCreate = undefined;

var _joi = require("@hapi/joi");

var _joi2 = _interopRequireDefault(_joi);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = require("../../constants");

var _model = require("../user/model");

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author 4Dcoder
 * @property {ObjectId} id Sms primaryKey
 * @property {String} sender Sms registered sending phone
 * @property {String} sender_as Sms sender's name or phone
 * @property {String} recipient Sms recipient phone
 * @property {String} message Sms message
 * @property {String} direction Sms direction INBOUND|OUTBOUND
 * @property {String} delivery_status Sms delivery status: queued|failed|sent|delivered|undelivered
 * @description Sms model holds record of all internal and external sms via ERP
 */
var Schema = _mongoose2.default.Schema;
var ObjectId = Schema.Types.ObjectId;
var schemaCreate = exports.schemaCreate = _joi2.default.object({
    sid: _joi2.default.string().optional(),
    code: _joi2.default.string().optional(),
    email: _joi2.default.string().optional(),
    password: _joi2.default.string().optional(),
    sender: _joi2.default.string().optional(),
    sender_as: _joi2.default.string().optional(),
    recipient: _joi2.default.string().required(),
    message: _joi2.default.string().required(),
    created_by: _joi2.default.string().required()
});

var schema = exports.schema = {
    sid: { type: String },
    code: { type: String, required: true, unique: true, index: true },
    sender: { type: String, required: true, default: _constants.SMS.SENDER }, // Phone
    sender_as: { type: String, default: _constants.SMS.SENDER }, // Sender's name
    recipient: { type: String, required: true }, // Phones
    message: { type: String, required: true },
    direction: { type: String, enum: ["INBOUND", "OUTBOUND"], default: "OUTBOUND" },
    delivery_status: { type: String },
    created_by: { type: ObjectId, ref: "User", required: true }
};

var options = _constants.DATABASE.OPTIONS;

var newSchema = new Schema(schema, options);
newSchema.set("collection", "sms");

var Sms = _mongoose2.default.model("Sms", newSchema);

exports.default = Sms;
//# sourceMappingURL=model.js.map