/* eslint-disable global-require */
/* eslint-disable complexity */
import log4js from "log4js";
import path from "path";
import rp from "request-promise";

import User from "../user/model";
import Setting from "../setting/model";
import Bank from "../bank/model";
import { success, fail, notFound } from "../../lib";

import { getToken } from "../../middleware/authorization";

// Logging
const logger = log4js.getLogger("[setup]");
log4js.configure({
    appenders: { file: { type: "file", filename: "logs/setup.log" } },
    categories: { default: { appenders: ["file"], level: "debug" } },
});

let host;
if (process.env.NODE_ENV === "development") {
    host = process.env.SERVER_DEV;
} else {
    host = process.env.SERVER_PROD;
}

const setupUrls = [
    // `${host}/api/setups/preload/{folder}/{collection}`,
    `${host}/api/setups/preload/user/user`,
    `${host}/api/setups/preload/setting/setting`,
    `${host}/api/setups/preload/bank/bank`,
];

export async function getCollection(req, res) {
    const result = [
        "user",
        "setting",
        "bank",
    ];
    return success(res, 201, result, "Valid setup collections!");
}

export async function setupSystem(req, res) {
    const accessToken = getToken(req);
    let results;
    console.log("\nThis is token \n\n\n", accessToken);

    const options = {
        uri: setupUrls[ 0 ],
        method: "GET",
        auth: { bearer: accessToken },
        headers: { "User-Agent": "Request-Promise" },
        json: true,
    };
    try {
        // results = await rp(options);
        results = await Promise.all(setupUrls.map((setupUrl) => {
            options.uri = setupUrl;
            return rp(options);
        }));
    } catch (err) {
        console.log(err.message);
        return fail(res, 401, `Error settingup system ${err.message}`);
    }
    return success(res, 201, results, "System Setup complete!");
}

export async function setCollection(req, res) {
    const { module, collection } = req.params;
    let model;
    const tablePath = path.join(__dirname, `../${module}/table`);
    // eslint-disable-next-line import/no-dynamic-require
    const table = require(`${tablePath}`).default;
    console.log(table);
    try {
        // eslint-disable-next-line default-case
        switch (collection) {
        case "setting": model = Setting; break;
        case "user": model = User; delete table[ 0 ]; break;
        case "bank": model = Bank; break;
        default: return fail(res, 401, `Error invalid collection: ${collection}`);
        }
        const result = await model.insertMany(table);
        if (!result) {
            logger.info("Operation was successful", []);
            return notFound(res, "Error: Bad Request: Model not found");
        }
        return success(res, 201, result, "Record created successfully!");
    } catch (err) {
        logger.error(err);
        return fail(res, 500, `Error creating record. ${err.message}`);
    }
}
