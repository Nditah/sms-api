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

/**
 * @author 4Dcoder
 * @property {ObjectId} id Message primaryKey
 * @property {String} code Message code for querying email
 * @property {ObjectId} user Message user or creator
 * @property {String} sender Message sender email
 * @property {String} recipient Message recipient email
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
var schemaCreate = exports.schemaCreate = _joi2.default.object({
    code: _joi2.default.string().required(),
    user: _joi2.default.string().required(),
    sender: _joi2.default.string().email().required(),
    recipient: _joi2.default.string().email().required(),
    subject: _joi2.default.string().required(),
    body: _joi2.default.string().required(),
    receive_status: _joi2.default.string().valid("UNREAD", "READ").optional(),
    sent_status: _joi2.default.string().valid("DRAFT", "SENT").optional(),
    created_by: _joi2.default.string().required()
});

var schemaUpdate = exports.schemaUpdate = _joi2.default.object({
    receive_status: _joi2.default.string().valid("UNREAD", "READ").optional(),
    sent_status: _joi2.default.string().valid("DRAFT", "SENT").optional(),
    updated_by: _joi2.default.string().required()
});

var schema = exports.schema = {
    code: { type: String, required: true, unique: true, index: true },
    user: { type: ObjectId, ref: "User", required: true },
    sender: {
        type: String,
        trim: true,
        lowercase: true,
        // eslint-disable-next-line no-useless-escape
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address for sender"],
        index: true
    },
    recipient: {
        type: String,
        trim: true,
        lowercase: true,
        // eslint-disable-next-line no-useless-escape
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address for the recipient"],
        index: true
    },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    box: { type: String, enum: ["INBOX", "OUTBOX"], required: true },
    receive_status: { type: String, enum: ["UNREAD", "READ"], required: true, default: "UNREAD" },
    sent_status: { type: String, enum: ["DRAFT", "SENT"], required: true, default: "DRAFT" },
    created_by: { type: ObjectId, ref: "User", required: true }, // Sender
    updated_by: { type: ObjectId, ref: "User" }
};

var options = _constants.DATABASE.OPTIONS;

var newSchema = new Schema(schema, options);
newSchema.set("collection", "message");

var Message = _mongoose2.default.model("Message", newSchema);

exports.default = Message;
//# sourceMappingURL=model.js.map