"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _credentials = require("./credentials");

var _credentials2 = _interopRequireDefault(_credentials);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

var uri = _credentials2.default.uri,
    options = _credentials2.default.options;


_mongoose2.default.connect(uri, options);

var database = _mongoose2.default.connection;

exports.default = database;
//# sourceMappingURL=database.js.map