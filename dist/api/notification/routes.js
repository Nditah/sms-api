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
router.get("/notifications", [_authorization.checkAuth, _authorization.isValidUser], _controller.fetchRecord);

/**
 * @api {post} /api/v1/notifications Create a Notification record
 * @apiName CreateNotification
 * @apiGroup Notification
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {ObjectId} user Notification user ObjectId
 * @apiParam {String} message Notification message
 * @apiParam {String} status Notification record status "PENDING|CLOSED"
 * @apiSuccess {Object} Notification Notification's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Notification not found.
 * @apiError 401 master access only.
 */
router.post("/notifications", [_authorization.checkAuth, _authorization.isValidAdmin], _controller.createRecord);

/**
 * @api {put} /api/v1/notifications/{recordId} Update a Notification record
 * @apiName UpdateNotification
 * @apiGroup Notification
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required record ObjectId
 * @apiParam {ObjectId} user Notification user ObjectId
 * @apiParam {String} message Notification message
 * @apiParam {String} status Notification record status "PENDING|CLOSED"
 * @apiSuccess {Object} Notification Notification's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Notification not found.
 * @apiError 401 master access only.
 */
router.put("/notifications/:recordId", [_authorization.checkAuth, _authorization.isValidUser], _controller.updateRecord);

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
router.delete("/notifications/:recordId", [_authorization.checkAuth, _authorization.isValidAdmin], _controller.deleteRecord);

exports.default = router;
//# sourceMappingURL=routes.js.map