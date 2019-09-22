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
 * @api {get} /api/v1/setups/ Retrieve setups collections
 * @apiName RetrieveSetup
 * @apiGroup Setup
 * @apiExample {curl} Example usage for retieving a single record:
 *      curl -i api/setups?
 * @apiParam {Object} filter query condition (optional)
 * @apiParam {Number} skip Number of records to offset by (optional)
 * @apiParam {Number} limit Maximum Number of records to retrieve (optional)
 * @apiParam {String} sort how records would be arranged in alphabet (optional)
 * @apiParam {String} projection list of record's attributes to retrieve (optional)
 */
router.get("/setups", [_authorization.checkAuth, _authorization.isValidAdmin], _controller.getCollection);

/**
 * @api {post} /api/v1/setups/system Complete System Setup
 * @apiName SystemSetup
 * @apiGroup Setup
 * @apiParam {String} username Master username
 * @apiParam {String} password Master password
 * @apiSuccess {Object} Setup Setup's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Setup not found.
 * @apiError 401 admin access only.
 */
router.get("/setups/preload/system", [_authorization.checkAuth, _authorization.isValidAdmin], _controller.setupSystem);

/**
 * @api {get} /api/v1/setups/preload/{module}/{collection} Preload Setups data
 * @apiName ModuleSetup
 * @apiGroup Setup
 * @apiExample {curl} Example usage for seeding bank records:
 *      curl -i api/setups/preload/bank/bank
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} module Setup folder directory
 * @apiParam {String} collection Setup collection name
 * @apiSuccess {Object} Setup Setup's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Setup not found.
 * @apiError 401 admin access only.
 */
router.get("/setups/preload/:module/:collection", [_authorization.checkAuth, _authorization.isValidAdmin], _controller.setCollection);

exports.default = router;
//# sourceMappingURL=routes.js.map