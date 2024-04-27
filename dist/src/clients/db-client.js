"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnDbClient = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
let db;
const uri = process.env.MONGO_URI || "";
/*
    @info   : This application implements singleton design pattern to have only 1 db conn
    @input  :
    @return : (db object) return the db connection
*/
const returnDbClient = () => {
    if (!db) {
        mongoose_1.default
            .connect(uri)
            .then((response) => {
            console.log("Connected to MongoDB");
            db = response;
        })
            .catch((err) => console.error("Could not connect to MongoDB"));
    }
    return db;
};
exports.returnDbClient = returnDbClient;
//# sourceMappingURL=db-client.js.map