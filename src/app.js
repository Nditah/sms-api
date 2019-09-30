import "babel-polyfill";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

import compression from "compression";
import path from "path";
import helmet from "helmet";

import apiRoutes from "./api";
import database from "./config";

dotenv.config();
const app = express();

const port = process.env.PORT || 8000;
const defaultPath = path.join(__dirname, "/public");

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.use(cors());
app.use(compression());
app.use(express.static(defaultPath));

database.on("error", console.error.bind(console, "Connection error:"));
database.once("open", () => {
    console.log("Successfully connected to the database!");
});

app.get("/", (req, res) => {
    console.log("defaultPath ", defaultPath);
    res.render(`${defaultPath}/index.html`);
});

// modify request object
app.use((req, res, next) => {
    res.locals.userId = 0.0;
    res.locals.userType = "anonymous";
    res.locals.role = "";
    next();
});

// Use Routes
app.use("/api/v1", apiRoutes);

app.use((req, res, next) => {
    const error = new Error("Api route requested is not found!");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        success: false,
        message: `SMS Portal API says ${error.message}`,
        payload: null,
    });
    next();
});

// listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

export default app;
