import express from "express";
import { checkAuth, isValidAdmin } from "../../middleware/authorization";
import { fetchRecord, createRecord, updateRecord, deleteRecord } from "./controller";
import { isValidUser } from "../../../../../calorie-api-backup/src/middleware/authorization";

const router = express.Router();

/**
 * @api {get} /api/v1/notifications?id={recordId} Retrieve Notification records
 * @apiName RetrieveNotification
 * @apiGroup Notification
 * @apiHeader {String} Authorization Bearer token
 * @apiExample {curl} Example usage for retieving a single record:
 *      curl -i api/notifications?
 * @apiParam {Object} filter query condition (optional)
 * @apiParam {Number} skip Number of records to offset by (optional)
 * @apiParam {Number} limit Maximum Number of records to retrieve (optional)
 * @apiParam {String} sort how records would be arranged in alphabet (optional)
 * @apiParam {String} projection list of record's attributes to retrieve (optional)
 * @apiDescription Records  of account headings belonging to one classification
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/notifications", [checkAuth, isValidUser], fetchRecord);

/**
 * @api {post} /api/v1/notifications Create a Notification record
 * @apiName CreateNotification
 * @apiGroup Notification
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {ObjectId} user Notification user ObjectId
 * @apiParam {String} message Notification message
 * @apiParam {String} notification_status Notification record status "PENDING|CLOSED"
 * @apiSuccess {Object} Notification Notification's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Notification not found.
 * @apiError 401 master access only.
 */
router.post("/notifications", [checkAuth, isValidAdmin], createRecord);

/**
 * @api {put} /api/v1/notifications/{recordId} Update a Notification record
 * @apiName UpdateNotification
 * @apiGroup Notification
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required record ObjectId
 * @apiParam {ObjectId} user Notification user ObjectId
 * @apiParam {String} message Notification message
 * @apiParam {String} notification_status Notification record status "PENDING|CLOSED"
 * @apiSuccess {Object} Notification Notification's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Notification not found.
 * @apiError 401 master access only.
 */
router.put("/notifications/:recordId", [checkAuth, isValidUser], updateRecord);

/**
 * @api {delete} /api/v1/notifications/{recordId} Delete a Notification record
 * @apiName DeleteNotification
 * @apiGroup Notification
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required record ObjectId
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Notification not found.
 * @apiError 401 master access only.
 */
router.delete("/notifications/:recordId", [checkAuth, isValidAdmin], deleteRecord);

export default router;
