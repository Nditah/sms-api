import express from "express";
import { checkAuth, isValidUser } from "../../middleware/authorization";
import { fetchRecord, createRecord, createWebhook, createOtp } from "./controller";

const router = express.Router();

/**
 * @api {get} /api/v1/sms?id={recordId} Retrieve SMS records
 * @apiName RetrieveSms
 * @apiGroup Sms
 * @apiHeader {String} Authorization Bearer token
 * @apiExample {curl} Example usage for retieving a single record:
 *      curl -i api/sms?
 * @apiParam {Object} filter query condition (optional)
 * @apiParam {Number} skip Number of records to offset by (optional)
 * @apiParam {Number} limit Maximum Number of records to retrieve (optional)
 * @apiParam {String} sort how records would be arranged in alphabet (optional)
 * @apiParam {String} projection list of record's attributes to retrieve (optional)
 * @apiDescription Records  of account headings belonging to one classification
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/sms", [checkAuth, isValidUser], fetchRecord);

/**
 * @api {post} /api/v1/sms Create an SMS record
 * @apiName CreateSms
 * @apiGroup Sms
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} sender Sms registered sending phone
 * @apiParam {String} sender_as Sms sender's name or phone
 * @apiParam {String} recipient Sms recipient(s) phone with (required)
 * comma-separated list for multiple phone numbers as recipient(s)
 * @apiParam {String} message Sms message  (required)
 * @apiParam {String} delivery_status Sms delivery status
 *  queued|failed|sent|delivered|undelivered (prohibited)
 * @apiSuccess {Object} Sms Sms's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Sms not found.
 * @apiError 401 master access only.
 */
router.post("/sms", [checkAuth, isValidUser], createRecord);

/**
 * @api {post} /api/v1/sms/externally Create an SMS Externally
 * @apiName CreateSmsExternally
 * @apiGroup Sms
 * @apiExample {curl} Example usage for sending sms externally:
 *      curl -i api/v1/sms/externally?code=abc123&email=somebody@example.com&
 *         password=secret&recipient=+10000123&message=hello world sms
 * @apiParam {String} sender Sms registered sending phone
 * @apiParam {String} sender_as Sms sender's name or phone
 * @apiParam {String} code Sms customer ApiKey  (required)
 * @apiParam {String} email Sms customer email  (required)
 * @apiParam {String} password Sms customer password  (required)
 * @apiParam {String} recipient Sms recipient(s) phone with
 * comma-separated list for multiple phone numbers as recipient(s)  (required)
 * @apiParam {String} message Sms message  (required)
 * @apiDescription code or email & password is sent for authentication.
 * @apiSuccess {Object} Sms Sms's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.post("/sms/externally", createRecord);
router.get("/sms/externally", createRecord);

/**
 * @api {post} /api/v1/sms/otp Create send SMS otp
 * @apiName CreateSmsOtp
 * @apiGroup Sms
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} phone Registered user (office) phone number
 * @apiSuccess {Object} Sms Sms's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Sms not found.
 */
router.post("/sms/otp", createOtp);

/**
 * @api {post} /api/v1/sms/webhook Create incoming SMS webhook
 * @apiName CreateSmsWebhook
 * @apiGroup Sms
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} sender Sms registered sending phone
 * @apiParam {String} sender_as Sms sender's name or phone
 * @apiParam {String} recipient Sms recipient phone number
 * @apiParam {String} message Sms message
 * @apiParam {String} direction Sms direction INBOUND|OUTBOUND
 * @apiParam {String} delivery_status Sms delivery status: queued|failed|sent|delivered|undelivered
 * @apiSuccess {Object} Sms Sms's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.post("/sms/webhook", createWebhook);

export default router;
