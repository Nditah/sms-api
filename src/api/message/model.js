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
import Joi from "@hapi/joi";
import mongoose from "mongoose";
import { DATABASE } from "../../constants";
import User from "../user/model";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export const schemaCreate = Joi.object({
    code: Joi.string().required(),
    user: Joi.string().required(),
    sender: Joi.string().email().required(),
    recipient: Joi.string().email().required(),
    subject: Joi.string().required(),
    body: Joi.string().required(),
    receive_status: Joi.string().valid("UNREAD", "READ").optional(),
    sent_status: Joi.string().valid("DRAFT", "SENT").optional(),
    created_by: Joi.string().required(),
});

export const schemaUpdate = Joi.object({
    receive_status: Joi.string().valid("UNREAD", "READ").optional(),
    sent_status: Joi.string().valid("DRAFT", "SENT").optional(),
    updated_by: Joi.string().required(),
});

export const schema = {
    code: { type: String, required: true, unique: true, index: true },
    user: { type: ObjectId, ref: "User", required: true },
    sender: {
        type: String,
        trim: true,
        lowercase: true,
        // eslint-disable-next-line no-useless-escape
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address for sender"],
        index: true,
    },
    recipient: {
        type: String,
        trim: true,
        lowercase: true,
        // eslint-disable-next-line no-useless-escape
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address for the recipient"],
        index: true,
    },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    box: { type: String, enum: ["INBOX", "OUTBOX"], required: true },
    receive_status: { type: String, enum: ["UNREAD", "READ"], required: true, default: "UNREAD" },
    sent_status: { type: String, enum: ["DRAFT", "SENT"], required: true, default: "DRAFT" },
    created_by: { type: ObjectId, ref: "User", required: true }, // Sender
    updated_by: { type: ObjectId, ref: "User" },
};

const options = DATABASE.OPTIONS;

const newSchema = new Schema(schema, options);
newSchema.set("collection", "message");

const Message = mongoose.model("Message", newSchema);

export default Message;
