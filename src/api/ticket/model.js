/**
 * @author 4Dcoder
 * @property {ObjectId} user Ticket user
 * @property {String} subject Ticket subject
 * @property {String} complaint Ticket complaint
 * @property {String} priority Ticket priority "LOW|NORMAL|HIGH"
 * @property {String} resolve_status Ticket status "OPEN|CLOSED|PENDING"
 * @description Ticket records user issues to be resolved by Admin
 */
import Joi from "joi";
import mongoose from "mongoose";
import { DATABASE } from "../../constants";
import User from "../user/model";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export const schemaCreate = {
    user: Joi.string().required(),
    subject: Joi.string().required(),
    complaint: Joi.string().required(),
    priority: Joi.string().required(),
    created_by: Joi.string().required(),
};

export const schemaUpdate = {
    user: Joi.string().optional(),
    subject: Joi.string().optional(),
    complaint: Joi.string().optional(),
    priority: Joi.string().optional(),
    resolve_status: Joi.string().optional(),
    updated_by: Joi.string().required(),
};

export const schema = {
    user: { type: ObjectId, ref: "User" },
    subject: { type: String },
    complaint: { type: String },
    priority: { type: String, enum: ["LOW", "NORMAL", "HIGH"] },
    resolve_status: {
        type: String,
        enum: ["OPEN", "CLOSED", "PENDING"],
        default: "PENDING",
    },
    created_by: { type: ObjectId, required: true },
    updated_by: { type: ObjectId, ref: "User" },
};

const options = DATABASE.OPTIONS;

const newSchema = new Schema(schema, options);
newSchema.set("collection", "ticket");

const Ticket = mongoose.model("Ticket", newSchema);

export default Ticket;
