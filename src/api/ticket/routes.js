import express from "express";
import { checkAuth, isValidUser, isValidAdmin } from "../../middleware/authorization";
import { fetchRecord, createRecord, updateRecord, deleteRecord } from "./controller";

const router = express.Router();

/**
 * @api {get} /api/v1/tickets?id={recordId} Retrieve Ticket records
 * @apiName RetrieveTicket
 * @apiGroup Ticket
 * @apiHeader {String} Authorization Bearer token
 * @apiExample {curl} Example usage for retieving a single record:
 *      curl -i api/tickets?
 * @apiParam {Object} filter query condition (optional)
 * @apiParam {Number} skip Number of records to offset by (optional)
 * @apiParam {Number} limit Maximum Number of records to retrieve (optional)
 * @apiParam {String} sort how records would be arranged in alphabet (optional)
 * @apiParam {String} projection list of record's attributes to retrieve (optional)
 * @apiDescription Records  of account headings belonging to one classification
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/tickets", [checkAuth, isValidUser], fetchRecord);

/**
 * @api {post} /api/v1/tickets Create a Ticket record
 * @apiName CreateTicket
 * @apiGroup Ticket
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {ObjectId} user Ticket user
 * @apiParam {String} subject Ticket subject
 * @apiParam {String} complaint Ticket complaint
 * @apiParam {String} priority Ticket priority "LOW|NORMAL|HIGH"
 * @apiParam {String} resolve_status Ticket status "OPEN|CLOSED|PENDING"
 * @apiSuccess {Object} Ticket Ticket's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ticket not found.
 * @apiError 401 master access only.
 */
router.post("/tickets", [checkAuth, isValidUser], createRecord);

/**
 * @api {put} /api/v1/tickets/{recordId} Update a Ticket record
 * @apiName UpdateTicket
 * @apiGroup Ticket
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required record ObjectId
 * @apiParam {ObjectId} user Ticket user
 * @apiParam {String} subject Ticket subject
 * @apiParam {String} complaint Ticket complaint
 * @apiParam {String} priority Ticket priority "LOW|NORMAL|HIGH"
 * @apiParam {String} resolve_status Ticket status "OPEN|CLOSED|PENDING"
 * @apiSuccess {Object} Ticket Ticket's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ticket not found.
 * @apiError 401 master access only.
 */
router.put("/tickets/:recordId", [checkAuth, isValidAdmin], updateRecord);

/**
 * @api {delete} /api/v1/tickets/{recordId} Delete a Ticket record
 * @apiName DeleteTicket
 * @apiGroup Ticket
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required record ObjectId
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Ticket not found.
 * @apiError 401 master access only.
 */
router.delete("/tickets/:recordId", [checkAuth, isValidAdmin], deleteRecord);

export default router;
