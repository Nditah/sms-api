/**
 * @author 4Decoder
 * @property {Number} id Setting primaryKey
 * @property {String} name Setting varaible name
 * @property {String} access Setting "public", "private"
 * @property {String} category Setting category of domains affected
 * @property {String} value Setting value value
 * @property {String} description Setting description
 * @description Setting holds record of all cities with schools
 */
import Joi from "@hapi/joi";
import mongoose from "mongoose";
import { DATABASE } from "../../constants";
import table from "./table";
import User from "../user/model";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export const schemaFetch = Joi.object({
    names: Joi.string().optional(),
    fields: Joi.string().optional(),
});

export const schemaUpdate = Joi.object({
    name: Joi.string().trim().optional(),
    access: Joi.string().trim().valid("public", "private").optional(),
    value: Joi.string().trim().optional(),
    category: Joi.string().optional(),
    description: Joi.string().optional(),
    updated_by: Joi.string().required(),
});

export const schema = {
    name: {
        type: String,
        uppercase: true,
        unique: true,
        required: [true, "Why no name?"],
    },
    access: { type: String, enum: ["public", "private"], required: [true, "Why no access?"] },
    value: { type: String, required: [true, "Why no value?"] },
    category: { type: String },
    description: { type: String, required: [true, "Why no description?"] },
    updated_by: { type: ObjectId, ref: "User" },
};

const preload = DATABASE.PRELOAD_TABLE_DATA.DEFAULT;
const options = DATABASE.OPTIONS;

const newSchema = new Schema(schema, options);
newSchema.index({ name: 1 }, { unique: true });
newSchema.set("collection", "setting");

const Setting = mongoose.model("Setting", newSchema);

if (preload) { Setting.insertMany(table); }

export default Setting;
