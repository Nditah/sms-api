import log4js from "log4js";
import aqp from "api-query-params";
import Message, { schemaCreate, schemaUpdate } from "./model";
import { success, fail, notFound, genCode, stringToArrayEmail } from "../../lib";
import { sendEmail } from "../../services";
import User from "../user/model";

// Logging
const logger = log4js.getLogger("[message]");
log4js.configure({
    appenders: { file: { type: "file", filename: "logs/message.log" } },
    categories: { default: { appenders: ["file"], level: "debug" } },
});

export async function getMessage(query) {
    const { filter, skip, limit, sort, projection } = aqp(query);
    const result = await Message.find(filter)
        .populate("created_by", "id phone email credit")
        .populate("updated_by", "id phone email credit")
        .populate("user", "title surname given_name email phone credit blocked deleted")
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .select(projection)
        .exec();
    return result;
}

export async function fetchRecord(req, res) {
    const { query } = req;
    try {
        const result = getMessage(query);
        if (!result) {
            return notFound(res, "Error: Bad Request: Model not found");
        }
        logger.info("Operation was successful", []);
        return success(res, 201, result, null);
    } catch (err) {
        logger.error(err);
        return fail(res, 500, `Error retrieving record. ${err.message}`);
    }
}

// eslint-disable-next-line complexity
export async function createRecord(req, res) {
    const data = req.body;
    data.code = genCode(32);
    data.user = data.created_by;
    const { error } = schemaCreate.validate(data);
    if (error) return fail(res, 422, `Error validating request data. ${error.message}`);
    try {
        const myArray = stringToArrayEmail(data.recipient) || [];

        data.box = "INBOX";
        const newRecord = new Message(data);
        const { recipient, sender, subject, body } = data;
        const sendToSelf = await sendEmail(sender, sender, subject, body);
        const sendToRecipient = await sendEmail(recipient, sender, subject, body);
        const result = await newRecord.save();
        data.box = "OUTBOX";
        const newRecord2 = new Message(data);
        const result2 = await newRecord2.save();
        if (!result) {
            logger.error("Operation failed", sendToSelf, sendToRecipient, []);
            return notFound(res, "Error: Bad Request: Model not found");
        }

        return success(res, 201, result2, "Record created successfully!");
    } catch (err) {
        logger.error(err);
        return fail(res, 500, `Error creating record. ${err.message}`);
    }
}

export async function updateRecord(req, res) {
    const data = req.body;
    const { recordId: id } = req.params;
    const { error } = schemaUpdate.validate(data);
    if (error) return fail(res, 422, `Error validating request data. ${error.message}`);
    try {
        const result = await Message.findOneAndUpdate({ _id: id }, data, { new: true });
        if (!result) {
            return notFound(res, `Bad Request: Model not found with id ${id}`);
        }
        return success(res, 200, result, "Record updated successfully!");
    } catch (err) {
        logger.error(err);
        return fail(res, 500, `Error updating record. ${err.message}`);
    }
}

export async function deleteRecord(req, res) {
    const { recordId: id } = req.params;
    try {
        const result = await Message.findOneAndRemove({ _id: id });
        if (!result) {
            return notFound(res, `Bad Request: Model not found with id ${id}`);
        }
        return success(res, 200, result, "Record deleted successfully!");
    } catch (err) {
        logger.error(err);
        return fail(res, 500, `Error deleting record. ${err.message}`);
    }
}
