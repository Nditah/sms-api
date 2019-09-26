import log4js from "log4js";
import aqp from "api-query-params";
import Transaction, { schemaCreate, schemaUpdate } from "./model";
import { success, fail, notFound } from "../../lib";
import User from "../user/model";

// Logging
const logger = log4js.getLogger("[transaction]");
log4js.configure({
    appenders: { file: { type: "file", filename: "logs/transaction.log" } },
    categories: { default: { appenders: ["file"], level: "debug" } },
});

export async function fetchRecord(req, res) {
    const { query } = req;
    try {
        const { filter, skip, limit, sort, projection } = aqp(query);
        if (req.user.type === "CUSTOMER") {
            filter.user = req.user.id;
        }
        const result = await Transaction.find(filter)
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

export async function createRecord(req, res) {
    const data = req.body;
    const { error } = schemaCreate.validate(data);
    if (error) return fail(res, 422, `Error validating request data. ${error.message}`);
    const newRecord = new Transaction(data);
    try {
        const result = await newRecord.save();
        if (!result) {
            logger.info("SUCCESS", []);
            return notFound(res, "Error: Bad Request: Model not found");
        }
        const result2 = await User.update({ _id: result.user._id },
            { $push: { transactions: result._id } }).exec();
        return success(res, 201, result, "Record created successfully!");
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
        const result = await Transaction.findOneAndUpdate({ _id: id }, data, { new: true });
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
        const result = await Transaction.findOneAndRemove({ _id: id });
        if (!result) {
            return notFound(res, `Bad Request: Model not found with id ${id}`);
        }
        const result2 = await User.update({ _id: result.user._id },
            { $pull: { transactions: result._id } }).exec();
        return success(res, 200, result, "Record deleted successfully!");
    } catch (err) {
        logger.error(err);
        return fail(res, 500, `Error deleting record. ${err.message}`);
    }
}
