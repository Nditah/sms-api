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
 * @property {ObjectId} id Notification primaryKey
 * @property {ObjectId} user Notification user ObjectId
 * @property {String} message Notification message
 * @property {String} notification_status Notification record status "PENDING|CLOSED"
 * @description Notification model holds record of all Notification
 */
var Schema = _mongoose2.default.Schema;
// eslint-disable-next-line import/no-cycle

var ObjectId = Schema.Types.ObjectId;
var schemaCreate = exports.schemaCreate = {
    user: _joi2.default.string().optional(),
    message: _joi2.default.string().optional(),
    notification_status: _joi2.default.string().valid("PENDING", "CLOSED").optional(),
    created_by: _joi2.default.string().required()
};

var schemaUpdate = exports.schemaUpdate = {
    user: _joi2.default.string().optional(),
    message: _joi2.default.string().optional(),
    notification_status: _joi2.default.string().valid("PENDING", "CLOSED").optional(),
    updated_by: _joi2.default.string().required()
};

var schema = exports.schema = {
    user: { type: ObjectId, ref: "User" },
    message: { type: String },
    notification_status: { type: String, enum: ["PENDING", "CLOSED"], default: "PENDING" },
    created_by: { type: ObjectId, ref: "User", required: true },
    updated_by: { type: ObjectId, ref: "User" }
};

var options = _constants.DATABASE.OPTIONS;

var newSchema = new Schema(schema, options);
newSchema.set("collection", "notification");

var Notification = _mongoose2.default.model("Notification", newSchema);

exports.default = Notification;
//# sourceMappingURL=model.js.map