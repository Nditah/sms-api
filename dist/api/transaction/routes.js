"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _authorization = require("../../middleware/authorization");

var _controller = require("./controller");

var _authorization2 = require("../../../../../calorie-api-backup/src/middleware/authorization");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
 * @api {get} /api/v1/transactions?id={recordId} Retrieve one or all records
 * @apiName RetrieveTransaction
 * @apiGroup Transaction
 * @apiExample {curl} Example usage for retieving a single record:
 *      curl -i api/transactions?
 * @apiParam {Object} filter query condition (optional)
 * @apiParam {Number} skip Number of records to offset by (optional)
 * @apiParam {Number} limit Maximum Number of records to retrieve (optional)
 * @apiParam {String} sort how records would be arranged in alphabet (optional)
 * @apiParam {String} projection list of record's attributes to retrieve (optional)
 * @apiDescription Records of transactions against various terminal bank-accounts.
 *  It is supplied by the banks. It is uploaded to this endpoint
 * to be Audited against Bank-Register records earlier recorded.
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/transactions", [_authorization.checkAuth, _authorization.isValidUser], _controller.fetchRecord);

/**
 * @api {post} /api/v1/transactions Create transactions
 * @apiName CreateTransaction
 * @apiGroup Transaction
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} customer transaction reference txRef (required)
 * @apiParam {Number} amount Transaction amount paid (required)
 * @apiParam {String} code transaction reference txRef (required)
 * @apiParam {String} gateway_details transaction response Object (required)
 * @apiParam {Number} sms_units Transaction sms_units (required)
 * @apiParam {String} payment_method Transaction payment method GATEWAY (required)
 * @apiParam {String} payment_gateway Transaction payment gateway FLUTTERWAVE (required)
 * @apiParam {String} payment_status Transaction transaction status (prohibited)
 * @apiParam {String} description Transaction description(optional)
 * @apiParam {String} credit_status Transaction credit status (prohibited)
 * @apiSuccess {Object} Transaction Transaction's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Transaction not found.
 * @apiError 401 master access only.
 */
router.post("/transactions", [_authorization.checkAuth, _authorization.isValidUser], _controller.createRecord);

/**
 * @api {put} /api/v1/transactions/{recordId} Update transactions
 * @apiName UpdateTransaction
 * @apiGroup Transaction
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required record ObjectId
 * @apiParam {String} customer transaction reference txRef (required)
 * @apiParam {Number} amount Transaction amount paid (required)
 * @apiParam {String} code transaction reference txRef (required)
 * @apiParam {String} gateway_details transaction response Object (required)
 * @apiParam {Number} sms_units Transaction sms_units (required)
 * @apiParam {String} payment_method Transaction payment method GATEWAY (required)
 * @apiParam {String} payment_gateway Transaction payment gateway FLUTTERWAVE (required)
 * @apiParam {String} payment_status Transaction transaction status (prohibited)
 * @apiParam {String} description Transaction description(optional)
 * @apiParam {String} credit_status Transaction credit status (prohibited)
 * @apiSuccess {Object} Transaction Transaction's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Transaction not found.
 * @apiError 401 master access only.
 */
router.put("/transactions/:recordId", [_authorization.checkAuth, _authorization2.isValidAdmin], _controller.updateRecord);

/**
 * @api {delete} /api/v1/transactions/{recordId} Delete transactions
 * @apiName DeleteTransaction
 * @apiGroup Transaction
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required record ObjectId
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Transaction not found.
 * @apiError 401 master access only.
 */
router.delete("/transactions/:recordId", [_authorization.checkAuth, _authorization2.isValidAdmin], _controller.deleteRecord);

exports.default = router;
//# sourceMappingURL=routes.js.map