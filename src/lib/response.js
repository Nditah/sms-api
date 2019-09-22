export const success = (res, status, entity,
    msg = "Operation was successful".customMessage) => res
    .status(status || 200)
    .json({
        success: true,
        payload: entity || [],
        message: msg || "Operation Successful(s)",
    });

export const fail = (res, status, msg) => res
    .status(status || 500)
    .json({
        success: false,
        payload: [],
        message: msg || "Operation failed!",
    });

export const notFound = (res, msg) => res
    .status(404)
    .json({
        success: false,
        payload: [],
        message: msg || "Record not found!",
    });
