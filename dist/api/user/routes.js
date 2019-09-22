"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _authorization = require("../../middleware/authorization");

var _controller = require("./controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
 * @api {get} /api/v1/users?id={recordId} Retrieve User records
 * @apiName RetrieveUser
 * @apiGroup User
 * @apiHeader {String} Authorization Bearer token
 * @apiExample {curl} Example usage for retieving a single record:
 *      curl -i api/users?
 * @apiParam {Object} filter query condition (optional)
 * @apiParam {Number} skip Number of records to offset by (optional)
 * @apiParam {Number} limit Maximum Number of records to retrieve (optional)
 * @apiParam {String} sort how records would be arranged in alphabet (optional)
 * @apiParam {String} projection list of record's attributes to retrieve (optional)
 * @apiDescription Records of user distributed across schools.
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/users", [_authorization.checkAuth, _authorization.isValidUser], _controller.fetchRecord);

/**
 * @api {post} /api/v1/users Create a User record
 * @apiName CreateUser
 * @apiGroup User
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} type User type (optional)
 * @apiParam {String} api_key User api_key (prohibited)
 * @apiParam {Boolean} api_access User api_access (optional)
 * @apiParam {String} title User title (optional)
 * @apiParam {String} surname User surname (required)
 * @apiParam {String} given_name User given_name (required)
 * @apiParam {String} gender User gender (required)
 * @apiParam {String} phone User office phone (required)
 * @apiParam {String} phone_personal User phone_personal (optional)
 * @apiParam {String} address User address (optional)
 * @apiParam {String} country_iso2 User country_iso2 (optional)
 * @apiParam {String} email User email (optional)
 * @apiParam {String} password User password (optional)
 * @apiParam {String} otp User otp (optional)
 * @apiParam {Number} otp_count User otp_count (optional)
 * @apiParam {Boolean} otp_access User otp_access (optional)
 * @apiParam {Number} credit User credit (prohibited)
 * @apiParam {Array} notifications User notifications (optional)
 * @apiParam {String} remark User remark (optional)
 * @apiParam {Boolean} deleted User deleted (prohibited)
 * @apiParam {Date} deleted_at User deleted_at (prohibited)
 * @apiParam {String} deleted_by User deleted_by (prohibited)
 * @apiParam {Boolean} blocked User blocked (prohibited)
 * @apiParam {Date} blocked_at User blocked_at (prohibited)
 * @apiParam {String} blocked_by User blocked_by (prohibited)
 * @apiParam {Date} last_login User last_login (prohibited)
 * @apiParam {String} last_ip User last_ip (prohibited)
 * @apiSuccess {Object} User User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User not found.
 * @apiError 401 master access only.
 */
router.post("/users", [_authorization.checkAuth, _authorization.isValidUser], _controller.createRecord);

/**
 * @api {put} /api/v1/users/{recordId} Update a User record
 * @apiName UpdateUser
 * @apiGroup User
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required record ObjectId
 * @apiParam {String} type User type (optional)
 * @apiParam {String} api_key User api_key (prohibited)
 * @apiParam {Boolean} api_access User api_access (prohibited)
 * @apiParam {String} title User title (optional)
 * @apiParam {String} surname User surname (required)
 * @apiParam {String} given_name User given_name (required)
 * @apiParam {String} gender User gender (required)
 * @apiParam {String} phone User office phone (required)
 * @apiParam {String} phone_personal User phone_personal (optional)
 * @apiParam {String} address User address (optional)
 * @apiParam {String} country_iso2 User country_iso2 (optional)
 * @apiParam {String} email User email (optional)
 * @apiParam {String} password User password (optional)
 * @apiParam {String} otp User otp (optional)
 * @apiParam {Number} otp_count User otp_count (optional)
 * @apiParam {Boolean} otp_access User otp_access (optional)
 * @apiParam {Number} credit User credit (prohibited)
 * @apiParam {Array} notifications User notifications (optional)
 * @apiParam {String} remark User remark (optional)
 * @apiParam {Boolean} deleted User deleted (prohibited)
 * @apiParam {Date} deleted_at User deleted_at (prohibited)
 * @apiParam {String} deleted_by User deleted_by (prohibited)
 * @apiParam {Boolean} blocked User blocked (prohibited)
 * @apiParam {Date} blocked_at User blocked_at (prohibited)
 * @apiParam {String} blocked_by User blocked_by (prohibited)
 * @apiParam {Date} last_login User last_login (prohibited)
 * @apiParam {String} last_ip User last_ip (prohibited)
 * @apiSuccess {Object} User User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User not found.
 * @apiError 401 master access only.
 */
router.put("/users/:recordId", [_authorization.checkAuth, _authorization.isValidUser], _controller.updateRecord);

/**
 * @api {delete} /api/v1/users/{recordId} Delete a User record
 * @apiName DeleteUser
 * @apiGroup User
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required record ObjectId
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 User not found.
 * @apiError 401 master access only.
 */
router.delete("/users/:recordId", [_authorization.checkAuth, _authorization.isValidAdmin], _controller.deleteRecord);

/**
 * @api {post} /api/v1/users/login Login User
 * @apiName LoginUser
 * @apiGroup User
 * @apiParam {String} email User email address (optional)
 * @apiParam {String} password User password (optional)
 * @apiParam {String} phone User official phone number (optional)
 * @apiParam {String} otp User One-Time-Password sent to phone (optional)
 * @apiParam {String} type Login type "EMAIL", "PHONE", "OTP" (required)
 * @apiSuccess (Success 200) 200 Login Successful.
 * @apiError 404 User not found.
 */
router.post("/users/login", _controller.login);

exports.default = router;
//# sourceMappingURL=routes.js.map