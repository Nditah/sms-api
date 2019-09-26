import express from "express";
import { checkAuth, isValidAdmin } from "../../middleware/authorization";
import { fetchRecord, createRecord, deleteRecord } from "./controller";

const router = express.Router();

/**
 * @api {get} /api/v1/messages?id={recordId} Retrieve one or all records
 * @apiName RetrieveMessage
 * @apiGroup Message
 * @apiHeader {String} Authorization Bearer token
 * @apiExample {curl} Example usage for retieving a single record:
 *      curl -i api/messages?
 * @apiParam {Object} filter query condition (optional)
 * @apiParam {Number} skip Number of records to offset by (optional)
 * @apiParam {Number} limit Maximum Number of records to retrieve (optional)
 * @apiParam {String} sort how records would be arranged in alphabet (optional)
 * @apiParam {String} projection list of record's attributes to retrieve (optional)
 * @apiDescription Records  of account headings belonging to one classification
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/messages", [checkAuth, isValidAdmin], fetchRecord);

/**
 * @api {post} /api/v1/messages Create messages
 * @apiName CreateMessage
 * @apiGroup Message
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} code Message code for querying email
 * @apiParam {ObjectId} user Message user or creator
 * @apiParam {String} sender Message sender email
 * @apiParam {String} recipient Message recipient email
 * @apiParam {String} subject Message subject
 * @apiParam {String} body Message body
 * @apiParam {String} receive_status Message receive_status
 * @apiParam {String} sent_status Message sent_status
 * @apiSuccess {Object} Message Message's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Message not found.
 * @apiError 401 master access only.
 */
router.post("/messages", [checkAuth, isValidAdmin], createRecord);

/**
 * @api {delete} /api/v1/messages/{recordId} Delete messages
 * @apiName DeleteMessage
 * @apiGroup Message
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required record ObjectId
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Message not found.
 * @apiError 401 master access only.
 */
router.delete("/messages/:recordId", [checkAuth, isValidAdmin], deleteRecord);

export default router;
