"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _authenticate = require("./authenticate");

Object.keys(_authenticate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _authenticate[key];
    }
  });
});

var _email = require("./email");

Object.keys(_email).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _email[key];
    }
  });
});

var _sms = require("./sms");

Object.keys(_sms).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _sms[key];
    }
  });
});

var _flutterwave = require("./flutterwave");

Object.keys(_flutterwave).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _flutterwave[key];
    }
  });
});
//# sourceMappingURL=index.js.map