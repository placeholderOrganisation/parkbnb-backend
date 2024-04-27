"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Controller = void 0;
const multer_1 = __importDefault(require("multer"));
const express_1 = require("express");
const s3_utils_1 = require("../utils/s3-utils");
const upload = (0, multer_1.default)();
exports.s3Controller = (0, express_1.Router)();
exports.s3Controller.post("/upload-single", upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file; // Assuming the file is sent as multipart/form-data
        const uploadedFileLocation = yield (0, s3_utils_1.uploadFileToS3)(file);
        res.status(200).send({ Location: uploadedFileLocation });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to upload file to S3" });
    }
}));
exports.s3Controller.post("/upload-multiple", upload.array("files", 10), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = req.files;
        const uploadedFileLocations = yield (0, s3_utils_1.uploadFilesToS3)(files);
        res.status(200).send({ Locations: uploadedFileLocations });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to upload files to S3" });
    }
}));
//# sourceMappingURL=s3-api.js.map