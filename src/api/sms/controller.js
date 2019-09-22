import Joi from "joi";
import log4js from "log4js";
import aqp from "api-query-params";
import Sms, { schemaCreate } from "./model";
import { success, fail, notFound, generateOtp, hash, stringToArrayPhone } from "../../lib";
import { receiveSms, sendSmsAsync } from "../../services";

import User from "../user/model";

// Logging
const logger = log4js.getLogger("[sms]");
log4js.configure({
    appenders: { file: { type: "file", filename: "logs/sms.log" } },
    categories: { default: { appenders: ["file"], level: "debug" } },
});

export async function fetchRecord(req, res) {
    const { query } = req;
    const { filter, skip, limit, sort, projection } = aqp(query);
    try {
        const result = await Sms.find(filter)
            .populate("created_by", "id phone email type")
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
export async function createOtp(req, res) {
    let otp = generateOtp().toString();
    const { phone } = req.body;
    if (!phone) fail(res, 422, "Error invalid phone");

    try {
        const send = await sendSmsAsync(phone, otp);
        const { sid } = send;
        if (!sid) return fail(res, 422, "Error sending message");
        otp = hash(otp);
        const record = { recipient: phone, message: otp, sid, direction: "OUTBOUND" };
        const newRecord = new Sms(record);
        const result1 = await newRecord.save();
        console.log(result1);
        const query = { phone };
        const update = { otp, otp_access: true, $inc: { otp_count: 1 } };
        const result = await User.findOneAndUpdate(query, update, { new: true });

        if (!result) {
            logger.info("Operation was successful", []);
            return notFound(res, "Error: Bad Request: Model not found");
        }
        return success(res, 201, send.to, "Record created successfully!");
    } catch (err) {
        logger.error(err);
        return fail(res, 500, `Error creating record. ${err.message}`);
    }
}

// eslint-disable-next-line complexity
export async function createRecord(req, res) {
    let data = {};
    let user = {};
    if (req.method === "POST") {
        data = req.body;
    } else {
        data = req.query;
    }
    const { code, email, password } = data;
    const { recipient: recipientArray } = data;
    try {
        const { created_by: userId } = data;
        if (userId) {
            user = await User.findOne({ _id: userId }).exec();
        } else {
            user = await User.findOne().or([
                { api_key: code, api_access: true },
                { email, password, api_access: true },
            ]).exec();
            data.created_by = user._id;
        }
        if (!user) return fail(res, 403, `Authentication failed for ${code} ${email}`);
        const { error } = Joi.validate(data, schemaCreate);
        if (error) return fail(res, 422, `Error validating request data. ${error.message}`);

        const myArray = stringToArrayPhone(recipientArray) || [];
        const sendingSms = myArray.length;
        if (sendingSms > user.credit) {
            return fail(res, 422, `Error! You have ${user.credit} units left. You cannot send ${sendingSms} sms`);
            // console.log(`You have ${user.sms_units}Units left. You cannot send ${sendingSms}`);
        }
        const resolvedFinalArray = await Promise.all(myArray.map(async (phone) => {
            const send = await sendSmsAsync(phone, data.message);
            data.sid = send.sid;
            data.recipient = phone;
            const newRecord = new Sms(data);
            const result = await newRecord.save();
            return result; // important to return the value
        }));

        const result2 = await User.findOneAndUpdate({ _id: data.created_by },
            { $inc: { credit: -sendingSms } }, { new: true });
        console.log(result2.credit);
        return success(res, 201, resolvedFinalArray, "Record created successfully!");
    } catch (err) {
        logger.error(err);
        return fail(res, 500, `Error creating record. ${err.message}`);
    }
}

export async function createWebhook(req, res) {
    const data = req.body;
    receiveSms(req, res);
    logger.info("Operation was successful", data);
}
