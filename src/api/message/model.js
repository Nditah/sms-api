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
import Joi from "joi";
import mongoose from "mongoose";
import { DATABASE } from "../../constants";
import User from "../user/model";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export const schemaCreate = {
    recipient: Joi.string().optional(),
    subject: Joi.string().required(),
    body: Joi.string().required(),
    receive_status: Joi.string().valid("UNREAD", "READ").optional(),
    sent_status: Joi.string().valid("DRAFT", "SENT").optional(),
    created_by: Joi.string().required(),
};

export const schemaUpdated = {
    receive_status: Joi.string().valid("UNREAD", "READ").optional(),
    sent_status: Joi.string().valid("DRAFT", "SENT").optional(),
    updated_by: Joi.string().required(),
};

export const schema = {
    recipient: { type: ObjectId, ref: "User" },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    box: { type: String, enum: ["INBOX", "OUTBOX"], required: true },
    receive_status: { type: String, enum: ["UNREAD", "READ"], required: true, default: "UNREAD" },
    sent_status: { type: String, enum: ["DRAFT", "SENT"], required: true, default: "DRAFT" },
    created_by: { type: ObjectId, ref: "User", alias: "sender", required: true }, // Sender
    updated_by: { type: ObjectId, ref: "User" },
};

const options = DATABASE.OPTIONS;

const newSchema = new Schema(schema, options);
newSchema.set("collection", "message");

const Message = mongoose.model("Message", newSchema);

export default Message;
