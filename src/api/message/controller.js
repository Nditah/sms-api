import Joi from "joi";
import log4js from "log4js";
import aqp from "api-query-params";
import Message, { schemaCreate, schemaUpdated } from "./model";
import { success, fail, notFound, isObjecId } from "../../lib";
import { sendEmail } from "../../services";
import User from "../user/model";

// Logging
const logger = log4js.getLogger("[message]");
log4js.configure({
    appenders: { file: { type: "file", filename: "logs/message.log" } },
    categories: { default: { appenders: ["file"], level: "debug" } },
});

export async function fetchRecord(req, res) {
    const { query } = req;
    const { filter, skip, limit, sort, projection } = aqp(query);
    try {
        const result = await Message.find(filter)
            .populate("user", "id phone email username fullname")
            .populate("created_by", "id username fullname, phone email type level")
            .populate("updated_by", "id username fullname, phone email type level")
            .skip(skip)
            .limit(limit)
            .sort(sort)
            .select(projection)
            .exec();
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
    const { error } = Joi.validate(data, schemaCreate);
    if (error) return fail(res, 422, `Error validating request data. ${error.message}`);
    try {
        data.box = "INBOX";
        const newRecord = new Message(data);
        const { recipient, sender, subject, body } = data;
        const personR = await User.findOne({ _id: recipient }).select("email").exec();
        let Sender;
        const personS = await Sender.findOne({ _id: data.created_by }).select("email").exec();
        const send1 = await sendEmail(personR.email, personS.email, subject, body);
        const send2 = await sendEmail(personS.email, personS.email, subject, body);
        // console.log(send);
        const result = await newRecord.save();
        if (!result) {
            logger.error("Operation failed", send1, send2, []);
            return notFound(res, "Error: Bad Request: Model not found");
        }
        data.box = "OUTBOX";
        const newRecord2 = new Message(data);
        const result2 = await newRecord2.save();
        return success(res, 201, result2, "Record created successfully!");
    } catch (err) {
        logger.error(err);
        return fail(res, 500, `Error creating record. ${err.message}`);
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
