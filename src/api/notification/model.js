/**
 * @author 4Dcoder
 * @property {ObjectId} id Notification primaryKey
 * @property {ObjectId} user Notification user ObjectId
 * @property {String} message Notification message
 * @property {String} status Notification record status "PENDING|CLOSED"
 * @description Notification model holds record of all Notification
 */
import Joi from "joi";
import mongoose from "mongoose";
import { DATABASE } from "../../constants";
// eslint-disable-next-line import/no-cycle
import User from "../user/model";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export const schemaCreate = {
    user: Joi.string().optional(),
    message: Joi.string().optional(),
    status: Joi.string().valid("PENDING", "CLOSED").optional(),
    created_by: Joi.string().required(),
};

export const schemaUpdate = {
    user: Joi.string().optional(),
    message: Joi.string().optional(),
    status: Joi.string().valid("PENDING", "CLOSED").optional(),
    updated_by: Joi.string().required(),
};

export const schema = {
    user: { type: ObjectId, ref: "User" },
    message: { type: String },
    status: { type: String, enum: ["PENDING", "CLOSED"], default: "PENDING" },
    created_by: { type: ObjectId, ref: "User", required: true },
    updated_by: { type: ObjectId, ref: "User" },
};

const options = DATABASE.OPTIONS;

const newSchema = new Schema(schema, options);
newSchema.set("collection", "notification");

const Notification = mongoose.model("Notification", newSchema);

export default Notification;
