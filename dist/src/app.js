"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const passport_1 = __importDefault(require("passport"));
const cookie_session_1 = __importDefault(require("cookie-session"));
// Passport + mongoose configuration
const passportConfig = __importStar(require("./config/passport-config"));
const db_client_1 = require("./clients/db-client");
(0, db_client_1.returnDbClient)();
// Controllers (route handlers)
const auth_api_1 = require("./controllers/api/auth-api");
const user_api_1 = require("./controllers/api/user-api");
const parking_api_1 = require("./controllers/api/parking-api");
// @ts-ignore
const s3_api_1 = require("./controllers/api/s3-api");
const geocode_api_1 = require("./controllers/api/geocode-api");
// Create Express server
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [process.env.CLIENT_URL, process.env.CLIENT_URL_WITH_WWW, "https://checkout.stripe.com"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));
app.use((0, cookie_session_1.default)({
    name: "session",
    keys: [process.env.COOKIE_SECRET],
    maxAge: 24 * 60 * 60 * 100,
}));
// Express configuration
app.set("port", process.env.PORT || 3001);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(passport_1.default.initialize(passportConfig));
app.use(passport_1.default.session());
app.use("/v1/auth", auth_api_1.authController);
app.use("/v1/user", user_api_1.userController);
app.use("/v1/parking", parking_api_1.parkingController);
app.use("/v1/s3", s3_api_1.s3Controller);
app.use("/v1/geocode", geocode_api_1.geocodingController);
// Route used to test app
app.get("/sa", (req, res) => {
    res.status(200).send("Hello, World from backend!");
});
// Route used to test app
app.get("/sa/test-route", (req, res) => {
    res.status(200).send("Hello, World!");
});
// Route to return HTML img tag
app.get("/sa/image", (req, res) => {
    const imageUrl = "https://parkbnb-test.s3.us-east-2.amazonaws.com/engagement%20%281%29.jpg";
    const imgTag = `<img src="${imageUrl}" alt="Image">`;
    res.send(imgTag);
});
// Route to /test that sends a form as HTML to upload a file to /v1/parking/upload
app.get("/test/sa/s3", (req, res) => {
    res.send(`
    <form action="/v1/s3/upload-single" method="post" enctype="multipart/form-data">
      <input type="file" name="file" />
      <input type="submit" value="Upload" />
    </form>
  `);
});
// Route to test auth
app.get("/test/sa/auth", (req, res) => {
    res.send(`
    <form action="/v1/auth/local" method="post">
      <input type="text" name="userEmail" />
      <input type="text" name="password" />
      <input type="submit" value="Upload" />
    </form>
  `);
});
exports.default = app;
//# sourceMappingURL=app.js.map