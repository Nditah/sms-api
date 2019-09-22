"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bank = require("./bank");

var _bank2 = _interopRequireDefault(_bank);

var _message = require("./message");

var _message2 = _interopRequireDefault(_message);

var _notification = require("./notification");

var _notification2 = _interopRequireDefault(_notification);

var _setting = require("./setting");

var _setting2 = _interopRequireDefault(_setting);

var _setup = require("./setup");

var _setup2 = _interopRequireDefault(_setup);

var _sms = require("./sms");

var _sms2 = _interopRequireDefault(_sms);

var _ticket = require("./ticket");

var _ticket2 = _interopRequireDefault(_ticket);

var _transaction = require("./transaction");

var _transaction2 = _interopRequireDefault(_transaction);

var _user = require("./user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// Use Routes


// Routes
router.use(_bank2.default);
router.use(_message2.default);
router.use(_notification2.default);
router.use(_setting2.default);
router.use(_setup2.default);
router.use(_sms2.default);
router.use(_ticket2.default);
router.use(_transaction2.default);
router.use(_user2.default);

exports.default = router;
//# sourceMappingURL=index.js.map