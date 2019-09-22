"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var success = exports.success = function success(res, status, entity) {
    var msg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "Operation was successful".customMessage;
    return res.status(status || 200).json({
        success: true,
        payload: entity || [],
        message: msg || "Operation Successful(s)"
    });
};

var fail = exports.fail = function fail(res, status, msg) {
    return res.status(status || 500).json({
        success: false,
        payload: [],
        message: msg || "Operation failed!"
    });
};

var notFound = exports.notFound = function notFound(res, msg) {
    return res.status(404).json({
        success: false,
        payload: [],
        message: msg || "Record not found!"
    });
};
//# sourceMappingURL=response.js.map