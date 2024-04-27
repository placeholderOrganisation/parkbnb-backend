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
exports.storageSpaceController = void 0;
const express_1 = __importDefault(require("express"));
const storagespace_model_1 = require("../../models/storagespace-model");
const storagespace_utils_1 = require("../utils/storagespace-utils");
exports.storageSpaceController = express_1.default.Router();
// Route to get all storagespaces which are is_available
exports.storageSpaceController.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const storageSpaces = yield storagespace_model_1.StorageSpace.find({
            is_available: true,
        });
        const partialStorageSpaces = (0, storagespace_utils_1.getPartialStorageSpaces)(storageSpaces);
        res.status(200).json(partialStorageSpaces);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to get storage spaces" });
    }
}));
// Route to get a parking given an ID
exports.storageSpaceController.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const storageSpaceId = req.params.id;
        const storageSpace = yield storagespace_model_1.StorageSpace.findOne({
            id: storageSpaceId,
        });
        if (!storageSpace) {
            return res.status(404).json({ message: "storage space not found" });
        }
        res.status(200).json(storageSpace);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to get storage space" });
    }
}));
// Route to update a parking given an ID
exports.storageSpaceController.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const storageSpaceId = req.params.id;
        const storageSpaceData = req.body;
        if (!storageSpaceData || Object.keys(storageSpaceData).length === 0) {
            return res.status(400).json({ message: "storage space data is required" });
        }
        const updatedStorageSpace = yield storagespace_model_1.StorageSpace.findOneAndUpdate({ id: storageSpaceId }, storageSpaceData, { new: true });
        if (!updatedStorageSpace) {
            return res.status(404).json({ message: "storage space not found" });
        }
        res.status(200).json(updatedStorageSpace);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update storage space" });
    }
}));
exports.storageSpaceController.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const storageSpaceData = req.body;
        if (!storageSpaceData || Object.keys(storageSpaceData).length === 0) {
            return res.status(400).json({ message: "storage space data is required" });
        }
        yield storagespace_model_1.StorageSpace.validate(storageSpaceData);
        const newStorageSpace = yield storagespace_model_1.StorageSpace.create(storageSpaceData);
        res.status(201).json(newStorageSpace);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create storage space" });
    }
}));
//# sourceMappingURL=storagespace-api.js.map