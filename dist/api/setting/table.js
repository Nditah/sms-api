"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = require("../../constants");

var _lib = require("../../lib");

var table = [{ access: "public", name: "VERSION", value: "1", category: "APP", description: "App Version. Greater than the current number will prompt update" }, { access: "private", name: "NAIRA_SMS_RATE", value: "1", category: "SMS", description: "Amount of SMS unit per Naira" }, { access: "private", name: "USD_SMS_RATE", value: "0.2", category: "SMS", description: "Amount of SMS unit per USD" }, { access: "private", name: "CFA_SMS_RATE", value: "4", category: "SMS", description: "Amount of SMS unit per CFA" }];

var userBaseId = _constants.DATABASE.BASE_ID.user;
var settingBaseId = _constants.DATABASE.BASE_ID.SETTING;

var result = table.map(function (record, index) {
    var obj = Object.assign({}, record);
    var id = index + 1;
    obj._id = (0, _lib.toObjectId)(settingBaseId, id);
    obj.created_by = (0, _lib.toObjectId)(userBaseId, 1);
    return obj;
});

exports.default = result;
//# sourceMappingURL=table.js.map