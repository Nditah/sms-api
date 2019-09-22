import mongoose from "mongoose";
import credentials from "./credentials";

mongoose.Promise = global.Promise;

const { uri, options } = credentials;

mongoose.connect(uri, options);

const database = mongoose.connection;

export default database;
