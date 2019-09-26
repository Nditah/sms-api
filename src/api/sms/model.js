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
import Joi from "@hapi/joi";
import mongoose from "mongoose";
import { DATABASE, SMS } from "../../constants";
import User from "../user/model";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export const schemaCreate = Joi.object({
    sid: Joi.string().optional(),
    code: Joi.string().optional(),
    email: Joi.string().optional(),
    password: Joi.string().optional(),
    sender: Joi.string().optional(),
    sender_as: Joi.string().optional(),
    recipient: Joi.string().required(),
    message: Joi.string().required(),
    created_by: Joi.string().required(),
});

export const schema = {
    sid: { type: String },
    code: { type: String, required: true, unique: true, index: true },
    sender: { type: String, required: true, default: SMS.SENDER }, // Phone
    sender_as: { type: String, default: SMS.SENDER }, // Sender's name
    recipient: { type: String, required: true }, // Phones
    message: { type: String, required: true },
    direction: { type: String, enum: ["INBOUND", "OUTBOUND"], default: "OUTBOUND" },
    delivery_status: { type: String },
    created_by: { type: ObjectId, ref: "User", required: true },
};

const options = DATABASE.OPTIONS;

const newSchema = new Schema(schema, options);
newSchema.set("collection", "sms");

const Sms = mongoose.model("Sms", newSchema);

export default Sms;
