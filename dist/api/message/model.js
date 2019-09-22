"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.schema = exports.schemaUpdated = exports.schemaCreate = undefined;

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
 * @property {ObjectId} id Message primaryKey
 * @property {ObjectId} recipient Message recipient user id
 * @property {String} subject Message subject
 * @property {String} body Message body
 * @property {String} receive_status Message receive_status
 * @property {String} sent_status Message sent_status
 * @description Message model holds record of all internal mails between user
 * For multiple recepient, a record is created for each to enable tracking of
 * individual status
 */
var Schema = _mongoose2.default.Schema;
var ObjectId = Schema.Types.ObjectId;
var schemaCreate = exports.schemaCreate = {
    recipient: _joi2.default.string().optional(),
    subject: _joi2.default.string().required(),
    body: _joi2.default.string().required(),
    receive_status: _joi2.default.string().valid("UNREAD", "READ").optional(),
    sent_status: _joi2.default.string().valid("DRAFT", "SENT").optional(),
    created_by: _joi2.default.string().required()
};

var schemaUpdated = exports.schemaUpdated = {
    receive_status: _joi2.default.string().valid("UNREAD", "READ").optional(),
    sent_status: _joi2.default.string().valid("DRAFT", "SENT").optional(),
    updated_by: _joi2.default.string().required()
};

var schema = exports.schema = {
    recipient: { type: ObjectId, ref: "User" },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    box: { type: String, enum: ["INBOX", "OUTBOX"], required: true },
    receive_status: { type: String, enum: ["UNREAD", "READ"], required: true, default: "UNREAD" },
    sent_status: { type: String, enum: ["DRAFT", "SENT"], required: true, default: "DRAFT" },
    created_by: { type: ObjectId, ref: "User", alias: "sender", required: true }, // Sender
    updated_by: { type: ObjectId, ref: "User" }
};

var options = _constants.DATABASE.OPTIONS;

var newSchema = new Schema(schema, options);
newSchema.set("collection", "message");

var Message = _mongoose2.default.model("Message", newSchema);

exports.default = Message;
//# sourceMappingURL=model.js.map