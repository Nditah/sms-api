"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var EMPLOYEE_TYPE = exports.EMPLOYEE_TYPE = {
    STAFF: "STAFF",
    DRIVER: "DRIVER",
    CONTRACTOR: "CONTRACTOR",
    UNKNOWN: "UNKNOWN"
};

var OFFICE_TYPE = exports.OFFICE_TYPE = {
    BOARD: "BOARD",
    DIRECTORATE: "DIRECTORATE",
    SUBSIDIARY: "SUBSIDIARY",
    DEPARTMENT: "DEPARTMENT",
    UNIT: "UNIT",
    SUBUNIT: "SUBUNIT",
    UNKNOWN: "UNKNOWN"
};

var PMT = exports.PMT = {
    BOARDING_STATUS: { CLOSED: "CLOSED", OPEN: "OPEN" },
    BOOKING_METHOD: { LIVE: "LIVE", RESERVATION: "RESERVATION", OFFLINE: "OFFLINE" },
    HIRING_STATUS: { CLOSED: "CLOSED", PENDING: "PENDING" },
    SCHEDULE_MODE: { DUMMY: "DUMMY", TIMELY: "TIMELY", DISABLE: "DISABLE" },
    RESERVATION_STATUS: { BOARDED: "BOARDED", BOOKED: "BOOKED" },
    SCHEDULE_STATUS: { ENROUTE: "ENROUTE", QUEUING: "QUEUING", BOARDING: "BOARDING" },
    ROUTE_CATEGORY: { LOCAL: "LOCAL", HIGHWAY: "HIGHWAY", SUBHIGHWAY: "SUBHIGHWAY" },
    BOOKING_STATUS: {
        SCHEDULED: "SCHEDULED",
        ARRIVED: "ARRIVED",
        PENDING: "PENDING",
        PROCESSING: "PROCESSING",
        INITIATED: "INITIATED",
        ACCEPTED: "ACCEPTED",
        QUEUED: "QUEUED",
        ONGOING: "ONGOING",
        DRIVER_REACHED: "DRIVER_REACHED",
        DRIVER_ASSIGNED: "DRIVER_ASSIGNED",
        NO_SHOW: "NO_SHOW",
        TIMEOUT: "TIMEOUT",
        REJECTED: "REJECTED",
        CANCELLED: "CANCELLED",
        COMPLETED: "COMPLETED",
        DRIVER_CANCELLED: "DRIVER_CANCELLED",
        CUSTOMER_CANCELLED: "CUSTOMER_CANCELLED",
        FAILED: "FAILED",
        STARTED: "STARTED",
        ON_THE_WAY: "ON_THE_WAY",
        DELIVERED: "DELIVERED",
        ENROUTE: "EN-ROUTE"
    }
};

var PAYMENT = exports.PAYMENT = {
    GATEWAY: {
        FLUTTERWAVE: "FLUTTERWAVE",
        INTERSWITCH: "INTERSWITCH",
        UNIONBANK: "UNIONBANK",
        PAYSTACK: "PAYSTACK",
        STRIPE: "STRIPE",
        PAYPAL: "PAYPAL",
        GOOGLE_WALLET: "GOOGLE_WALLET"
    },
    METHOD: {
        GATEWAY: "GATEWAY",
        POS: "POS",
        CASH: "CASH",
        CHEQUE: "CHEQUE",
        TRANSFER: "TRANSFER",
        USSD: "USSD"
    },
    STATUS: { PENDING: "PENDING", SUCCESSFUL: "SUCCESSFUL", FAIL: "FAIL" }

};

var PML = exports.PML = {
    RECIPIENT_TYPE: { INDIVIDUAL: "INDIVIDUAL", ORGANIZATION: "ORGANIZATION" },
    ROUTING_STATUS: { STORE: "STORE", TRANSIT: "TRANSIT" },
    DELIVERY_STATUS: { PENDING: "PENDING", STORE: "STORE", TRANSIT: "TRANSIT", DELIVER: "DELIVER", DISCHARGE: "DISCHARGE" },
    DELIVERY_TYPE: { HOME: "HOME", TERMINAL: "TERMINAL" },
    BILLING_TYPE: { PRE_PAID: "PRE_PAID", POST_PAID: "POST_PAID", DEDICATED: "DEDICATED" },
    FRAGILITY: { ROBUST: "ROBUST", FRAGILE: "FRAGILE" },
    PERISHABILITY: { NONPERISHABLE: "NONPERISHABLE", PERISHABLE: "PERISHABLE" },
    COMBUSTIBILITY: { NONCOMBUSTIBLE: "NONCOMBUSTIBLE", COMBUSTIBLE: "COMBUSTIBLE" },
    ODIFEROUSNESS: { ODOROUS: "ODOROUS", ODORLESS: "ODORLESS" },
    SOLIDITY: { SOLID: "SOLID", LIQUID: "LIQUID" },
    UNIQUENESS: { ORDINARY: "ORDINARY", EXTRAORDINARY: "EXTRAORDINARY" }
};

var GENDER = exports.GENDER = {
    MALE: "MALE",
    FEMALE: "FEMALE"
};

var MARITAL_STATUS = exports.MARITAL_STATUS = {
    SINGLE: "SINGLE",
    MARRIED: "MARRIED",
    DIVORSED: "DIVORSED",
    SEPARATED: "SEPARATED",
    WIDOWED: "WIDOWED",
    UNKNOWN: "UNKNOWN"
};

var STUDENT_TYPE = exports.STUDENT_TYPE = {
    APPLICANT: "APPLICANT",
    ALUMNI: "ALUMNI",
    CURRENT: "CURRENT"
};

var PERSONAL_TITLE = exports.PERSONAL_TITLE = {
    MR: "MR",
    MISS: "MISS",
    MRS: "MRS",
    DR: "DR",
    PROF: "PROF",
    ENGR: "ENGR",
    BARR: "BARR",
    FR: "FR",
    REV: "REV",
    PASTOR: "PASTOR",
    CHIEF: "CHIEF",
    HON: "HON",
    SIR: "SIR",
    MADAM: "MADAM",
    UNKNOWN: "UNKNOWN"
};

var EMPLOYMENT_STATUS = exports.EMPLOYMENT_STATUS = {
    ON_DUTY: "ON_DUTY",
    ON_LEAVE: "ON_LEAVE",
    ON_PROBATION: "ON_PROBATION",
    ON_SUSPENSION: "ON_SUSPENSION",
    ON_RETIREMENT: "ON_RETIREMENT",
    UNKNOWN: "UNKNOWN"
};

var ASSET_WORTHINESS = exports.ASSET_WORTHINESS = {
    APPRECIATE: "APPRECIATE",
    DEPRECIATE: "DEPRECIATE",
    UNKNOWN: "UNKNOWN"
};

var BANK_ACCOUNT_TYPE = exports.BANK_ACCOUNT_TYPE = {
    SAVINGS: "SAVINGS",
    CORPORATE: "CORPORATE",
    DOMICIARY: "DOMICIARY",
    UNKNOWN: "UNKNOWN"
};

var BANK_ACCOUNT_USAGE = exports.BANK_ACCOUNT_USAGE = {
    WEBPAY: "WEBPAY",
    POS: "POS",
    REMITTANCE: "REMITTANCE",
    REGULAR: "REGULAR",
    UNKNOWN: "UNKNOWN"
};

var ACCOUNT_CLASS_TYPE = exports.ACCOUNT_CLASS_TYPE = {
    ASSETS: "ASSETS",
    LIABILITIES: "LIABILITIES",
    CAPITAL: "CAPITAL",
    REVENUE: "REVENUE",
    EXPENSES: "EXPENSES",
    UNKNOWN: "UNKNOWN"
};

var ACCOUNT_CLASS_CATEGORY = exports.ACCOUNT_CLASS_CATEGORY = {
    ADMINISTRATIVE: "ADMINISTRATIVE",
    OPERATION: "OPERATION",
    UNKNOWN: "UNKNOWN"
};

var ACCESS_LEVEL = exports.ACCESS_LEVEL = [{ name: "LOW", level: 0, user: "EMPLOYEE", description: "Cannot Access the ERP" }, { name: "NORMAL", level: 1, user: "OFFICER", description: "Can only login and view ERP" }, { name: "HIGH", level: 2, user: "UNIT_HEAD", description: "Can carry out all basic operations" }, { name: "VERY_HIGH", level: 3, user: "DEPT_HEAD", description: "Record Acknowledgement" }, { name: "ULTRA_HIGH", level: 4, user: "DIRECTOR", description: "Record Approval" }, { name: "UNLIMITED", level: 5, user: "CHAIRMAN", description: "Unlimited Privilege" }];

var RATING = exports.RATING = {
    SUBJECT: ["STAFF", "DRIVER", "TERMINAL", "VEHICLE"]
};

var DATABASE = exports.DATABASE = {
    TABLES: ["STAFF", "DRIVER", "OWNER", "VEHICLE", "ASSET"],
    PRELOAD_TABLE_DATA: { TRUE: true, FALSE: false, DEFAULT: false },
    RECORD_STATUS: {
        PENDING: "PENDING",
        REJECTED: "REJECTED",
        ACKNOWLEDGED: "ACKNOWLEDGED",
        APPROVED: "APPROVED",
        AUTHORIZED: "AUTHORIZED",
        AUDITED: "AUDITED",
        CLOSED: "CLOSED"
    },
    BASE_ID: {
        STAFF: "5a51bc91860d8b5ba",
        COUNTRY: "5951bc91860d8b5b9",
        BANK: "5651bc91860d8b5b6",
        BANK_ACCOUNT: "5651bc91860d8b5ba",
        CUSTOMER: "5a51bc91860d8b5a5",
        SETTING: "5051bc91860d8b505"
    },
    OPTIONS: {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
        autoIndex: true,
        minimize: false,
        versionKey: false,
        toJSON: {
            virtuals: true,
            // eslint-disable-next-line func-names
            // eslint-disable-next-line object-shorthand
            transform: function transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                // eslint-disable-next-line no-underscore-dangle
                delete ret.__v;
            }
        }
    }
};

var JWT = exports.JWT = {
    saltRounds: 2,
    jwtSecret: "yo-it`s-a_hidden-secret",
    tokenExpireTime: "48h"
};

var EMAIL = exports.EMAIL = {
    CONTACT: "nditah@gmail.com"
};

var SMS = exports.SMS = {
    SENDER: "+13234981706"
};

var API = exports.API = {
    URL: "https://sms-app-backend.herokuapp.com"
};

var FLUTTERWAVE = exports.FLUTTERWAVE = {
    LIVE_URL: "https://api.ravepay.co",
    TEST_URL: "https://ravesandboxapi.flutterwave.com",
    PAY: "/flwv3-pug/getpaidx/api/v2/hosted/pay",
    VERIFY: "/flwv3-pug/getpaidx/api/v2/verify",
    REDIRECT_URL: "https://sms-app-backend.herokuapp.com/verify",
    SUBACCOUNT: "/v2/gpx/subaccounts",
    TRANSACTION: "/v2/gpx/transactions",
    TRANSACTION_EVENTS: "/v2/gpx/transactionmeta/events",
    SETTLEMENT: "/v2/merchant/settlements",
    BVN: "/v2/kyc/bvn"
};

var USER_ROLES = exports.USER_ROLES = {
    ADMIN: "ADMIN",
    CUSTOMER: "CUSTOMER",
    DRIVER: "DRIVER",
    STAFF: "STAFF"
};

var TRANSPORT_DOC = exports.TRANSPORT_DOC = {
    LOGO: "LOGO",
    DOCUMENT: "DOCUMENT",
    OTHERS: "OTHERS",
    INSURANCE: "INSURANCE",
    INSURANCE_PLACE: "INSURANCE_PLACE",
    PERMIT: "PERMIT",
    OWNERSHIP: "OWNERSHIP",
    VEHICLE: "VEHICLE"
};

var INPUT_TYPE = exports.INPUT_TYPE = {
    TEXT: "TEXT",
    TEXTAREA: "TEXTAREA",
    DROPDOWN: "DROPDOWN",
    FILE: "FILE",
    DATETIME: "DATETIME",
    LOCATION: "LOCATION",
    SELECTLIST: "SELECTLIST",
    RADIOBUTTON: "RADIOBUTTON",
    CHECKBOXES: "CHECKBOXES",
    DATE: "DATE",
    TIME: "TIME",
    NUMBER: "NUMBER"
};

var ISSUE_PRIORITY = exports.ISSUE_PRIORITY = {
    EMERGENCY: "P1",
    HIGH: "P2",
    NORMAL: "P3",
    LOW: "P4"
};
//# sourceMappingURL=index.js.map