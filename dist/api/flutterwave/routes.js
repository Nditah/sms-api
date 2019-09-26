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
 * @api {get} /api/flutterwave?id={recordId} Retrieve one or all records
 * @apiName RetrieveFlutterwave
 * @apiGroup Flutterwave
  * @apiExample {curl} Example usage for retieving a single record:
 *      curl -i api/flutterwave?
 * @apiParam {Object} filter query condition (optional)
 * @apiParam {Number} skip Number of records to offset by (optional)
 * @apiParam {Number} limit Maximum Number of records to retrieve (optional)
 * @apiParam {String} sort how records would be arranged in alphabet (optional)
 * @apiParam {String} projection list of record's attributes to retrieve (optional)
 * @apiDescription Records  of account headings belonging to one classification
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/flutterwave", [_authorization.checkAuth, _authorization.isValidAdmin], _controller.fetchRecord);

/**
 * @api {get} /api/flutterwave/online?id={recordId} Retrieve one or all online Tnx
 * @apiName RetrieveFlutterwaveOnline
 * @apiGroup Flutterwave
 * @apiExample {curl} Example usage for retieving multiple records:
 *      curl -i https://ravesandboxapi.flutterwave.com/v2/gpx/transactions/query?
 * @apiParam {Number} id transaction ID from from the Verify transaction response (optional)
 * @apiParam {Number} offset Number of records to skip (optional)
 * @apiParam {Number} limit Maximum Number of records to retrieve (optional)
 * @apiParam {Date} from transactions Start-date to list records (optional)
 * @apiParam {Date} to transactions End-date to list records (optional)
 * @apiParam {String} currency transactions currency to query records e.g. "NGN"
 * @apiParam {String} status transactions status to query records e.g. "successful"
 * @apiDescription Records of online transactions or retrieve the timeline events
 * detail of a transaction
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/flutterwave/online", [_authorization.checkAuth, _authorization.isValidAdmin], _controller.queryOnlineTnx);

/**
 * @api {get} /api/flutterwave/settlement?id={recordId} Retrieve one or all records
 * @apiName RetrieveFlutterwaveSettlement
 * @apiGroup Flutterwave
 * @apiExample {curl} Example usage for retieving multiple records:
 *      curl -i http://localhost/api/flutterwave?page=1&limit=50&status=completed
 * @apiParam {Number} page to retrieve (optional)
 * @apiParam {Number} limit Maximum Number of records to retrieve (optional)
 * @apiParam {String} status Transaction status to retrieve e.g. "completed"
 * @apiDescription Records of Settlement accounts
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/flutterwave/settlement", [_authorization.checkAuth, _authorization.isValidAdmin], _controller.fetchSettlement);

/**
 * @api {post} /api/flutterwave Create flutterwave
 * @apiName CreateFlutterwave
 * @apiGroup Flutterwave
 * @apiParam {Number} flwId Flutterwave flwId // 125837,
 * @apiParam {String} txRef Flutterwave txRef // "rave-pos-272519815315",
 * @apiParam {String} flwRef Flutterwave flwRef // "FLWACHMOCK-1523118279396",
 * @apiParam {String} orderRef Flutterwave orderRef // "URF_1523118277202_7343035",
 * @apiParam {String} paymentPlan Flutterwave paymentPlan // null,
 * @apiParam {Date} createdAt Flutterwave createdAt // "2018-04-07T16:24:37.000Z",
 * @apiParam {Number} amount Flutterwave amount // 200,
 * @apiParam {Number} charged_amount Flutterwave charged_amount // 200,
 * @apiParam {String} status Flutterwave status // "successful",
 * @apiParam {String} IP Flutterwave IP // "197.149.95.62",
 * @apiParam {String} currency Flutterwave currency // "NGN",
 * @apiParam {Object} customer Flutterwave customer Object {
 *      {Number} id customer id // 5766,
 *      {String} phone customer phone , // "N/A",
 *      {String} fullName customer phone , // "Anonymous customer",
 *      {String} customertoken customer phone , // null,
 *      {String} email customer phone , // "salesmode@ravepay.co",
 *      {Date} createdAt customer phone , // "2017-10-16T10:03:19.000Z",
 *      {Date} updatedAt customer phone , // "2017-10-16T10:03:19.000Z",
 *      {Date} deletedAt customer phone , // null,
 *      {Number} AccountId customer phone , // 134,
 *      },
 * @apiParam {Object} entity Flutterwave entity Object {
 *      {String} account_number entity , // "0690000037",
 *      {String} first_name entity , // "Dele Moruf",
 *      {String} last_name entity , // "Quadri",
 *      {String} card6 entity , // "539983",
 *      {String} card_last4 entity , // "8381",
 *      },
 * @apiSuccess {Object} Flutterwave Flutterwave's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Flutterwave not found.
 * @apiError 401 master access only.
 */
router.post("/flutterwave", _controller.createRecord);

/**
 * @api {get} /api/flutterwave/bvn/:bvn verify BVN
 * @apiName VerifyBvn
 * @apiGroup Flutterwave
 * @apiParam {String} bvn Bank Verification Number
 * @apiDescription This allows you verify the authenticity of a BVN
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/flutterwave/bvn/:bvn", _controller.verifyBvn);

/**
 * @api {get} /api/flutterwave/payment/{txref} verify Payment
 * @apiName VerifyPayment
 * @apiGroup Flutterwave
 * @apiParam {String} txref Transaction Reference Number
 * @apiDescription This allows you verify the authenticity of a Transaction
 * in terms of status, amount and currency
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/flutterwave/payment/:txref", _controller.verifyOnlineTnx);

/**
 * @api {patch} /api/flutterwave/{recordId} Patch flutterwave
 * @apiName PatchFlutterwave
 * @apiGroup Flutterwave
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required record ObjectId
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Flutterwave not found.
 * @apiError 401 master access only.
 */
router.patch("/flutterwave/:recordId", [_authorization.checkAuth, _authorization.isValidAdmin], _controller.patchRecord);

exports.default = router;
//# sourceMappingURL=routes.js.map