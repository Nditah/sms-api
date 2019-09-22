import express from "express";
import { checkAuth, isValidUser, isValidAdmin } from "../../middleware/authorization";
import { fetchRecord, createRecord, updateRecord, deleteRecord } from "./controller";

const router = express.Router();

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
router.get("/transactions", [checkAuth, isValidUser], fetchRecord);

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
router.post("/transactions", [checkAuth, isValidUser], createRecord);

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
router.put("/transactions/:recordId", [checkAuth, isValidAdmin], updateRecord);

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
router.delete("/transactions/:recordId", [checkAuth, isValidAdmin], deleteRecord);

export default router;
