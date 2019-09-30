"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

require("babel-polyfill");

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _compression = require("compression");

var _compression2 = _interopRequireDefault(_compression);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _helmet = require("helmet");

var _helmet2 = _interopRequireDefault(_helmet);

var _api = require("./api");

var _api2 = _interopRequireDefault(_api);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var app = (0, _express2.default)();

var port = process.env.PORT || 8000;
var defaultPath = _path2.default.join(__dirname, "/public");

app.use((0, _helmet2.default)());
app.use(_bodyParser2.default.urlencoded({ extended: true, limit: "50mb" }));
app.use(_bodyParser2.default.json({ limit: "50mb" }));
app.use((0, _morgan2.default)("dev"));
app.use((0, _cors2.default)());
app.use((0, _compression2.default)());
app.use(_express2.default.static(defaultPath));

_config2.default.on("error", console.error.bind(console, "Connection error:"));
_config2.default.once("open", function () {
    console.log("Successfully connected to the database!");
});

app.get("/", function (req, res) {
    console.log("defaultPath ", defaultPath);
    res.render(defaultPath + "/index.html");
});

// modify request object
app.use(function (req, res, next) {
    res.locals.userId = 0.0;
    res.locals.userType = "anonymous";
    res.locals.role = "";
    next();
});

// Use Routes
app.use("/api/v1", _api2.default);

app.use(function (req, res, next) {
    var error = new Error("Api route requested is not found!");
    error.status = 404;
    next(error);
});

app.use(function (error, req, res, next) {
    res.status(error.status || 500);
    res.json({
        success: false,
        message: "SMS Portal API says " + error.message,
        payload: null
    });
    next();
});

// listen for requests
app.listen(port, function () {
    console.log("Server is listening on port " + port);
});

exports.default = app;
//# sourceMappingURL=app.js.map