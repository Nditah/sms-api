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
 * @property {ObjectId} user Ticket user
 * @property {String} subject Ticket subject
 * @property {String} complaint Ticket complaint
 * @property {String} priority Ticket priority "LOW|NORMAL|HIGH"
 * @property {String} resolve_status Ticket status "OPEN|CLOSED|PENDING"
 * @description Ticket records user issues to be resolved by Admin
 */
var Schema = _mongoose2.default.Schema;
// eslint-disable-next-line import/no-cycle

var ObjectId = Schema.Types.ObjectId;
var schemaCreate = exports.schemaCreate = _joi2.default.object({
    user: _joi2.default.string().required(),
    subject: _joi2.default.string().required(),
    complaint: _joi2.default.string().required(),
    priority: _joi2.default.string().valid("LOW", "NORMAL", "HIGH").required(),
    created_by: _joi2.default.string().required()
});

var schemaUpdate = exports.schemaUpdate = _joi2.default.object({
    user: _joi2.default.string().optional(),
    subject: _joi2.default.string().optional(),
    complaint: _joi2.default.string().optional(),
    priority: _joi2.default.string().valid("LOW", "NORMAL", "HIGH").optional(),
    resolve_status: _joi2.default.string().optional(),
    updated_by: _joi2.default.string().required()
});

var schema = exports.schema = {
    user: { type: ObjectId, ref: "User" },
    subject: { type: String },
    complaint: { type: String },
    priority: { type: String, enum: ["LOW", "NORMAL", "HIGH"] },
    resolve_status: {
        type: String,
        enum: ["OPEN", "CLOSED", "PENDING"],
        default: "PENDING"
    },
    created_by: { type: ObjectId, required: true },
    updated_by: { type: ObjectId, ref: "User" }
};

var options = _constants.DATABASE.OPTIONS;

var newSchema = new Schema(schema, options);
newSchema.set("collection", "ticket");

var Ticket = _mongoose2.default.model("Ticket", newSchema);

exports.default = Ticket;
//# sourceMappingURL=model.js.map