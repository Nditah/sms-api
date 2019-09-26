import Joi from "@hapi/joi";
import log4js from "log4js";
import aqp from "api-query-params";
import Sms, { schemaCreate } from "./model";
import { success, fail, notFound, generateOtp, hash, stringToArrayPhone, genCode } from "../../lib";
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
    try {
        const { filter, skip, limit, sort, projection } = aqp(query);
        if (req.user.type === "CUSTOMER") {
            filter.user = req.user.id;
        }
        const result = await Sms.find(filter)
            .populate("user", "title surname given_name email phone credit blocked deleted")
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
    if (req.method === "POST") {
        data = req.body;
    } else {
        data = req.query;
    }
    const { recipient: recipientList } = data;
    try {
        data.code = genCode(32);
        const { error } = schemaCreate.validate(data);
        if (error) return fail(res, 422, `Error validating request data. ${error.message}`);

        const myArray = stringToArrayPhone(recipientList) || [];
        const sendingSms = myArray.length;
        if (sendingSms > data.credit) {
            return fail(res, 422, `Error! You have ${data.credit} units left. You cannot send ${sendingSms} sms`);
            // console.log(`You have ${user.sms_units}Units left. You cannot send ${sendingSms}`);
        }
        const resolvedFinalArray = await Promise.all(myArray.map(async (phone) => {
            const send = await sendSmsAsync(phone, data.message);
            logger.error(send);
            data.sid = send.sid;
            data.recipient = phone;
            const newRecord = new Sms(data);
            const result = await newRecord.save();
            return result; // important to return the value
        }));

        const result2 = await User.findOneAndUpdate({ _id: data.created_by },
            { $inc: { credit: -sendingSms } }, { new: true });
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
