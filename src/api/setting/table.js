import { DATABASE } from "../../constants";
import { toObjectId } from "../../lib";

const table = [
    { access: "public", name: "VERSION", value: "1", category: "APP", description: "App Version. Greater than the current number will prompt update" },
    { access: "private", name: "NAIRA_SMS_RATE", value: "1", category: "SMS", description: "Amount of SMS unit per Naira" },
    { access: "private", name: "USD_SMS_RATE", value: "0.2", category: "SMS", description: "Amount of SMS unit per USD" },
    { access: "private", name: "CFA_SMS_RATE", value: "4", category: "SMS", description: "Amount of SMS unit per CFA" },
];

const userBaseId = DATABASE.BASE_ID.user;
const settingBaseId = DATABASE.BASE_ID.SETTING;

const result = table.map((record, index) => {
    const obj = Object.assign({}, record);
    const id = index + 1;
    obj._id = toObjectId(settingBaseId, id);
    obj.created_by = toObjectId(userBaseId, 1);
    return obj;
});

export default result;
