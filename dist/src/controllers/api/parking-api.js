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
exports.parkingController = void 0;
const express_1 = __importDefault(require("express"));
const parking_model_1 = require("../../models/parking-model");
const parking_utils_1 = require("../utils/parking-utils");
exports.parkingController = express_1.default.Router();
// Route to get all parkings which are is_available
exports.parkingController.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parkings = yield parking_model_1.Parking.find({
            is_available: true,
        });
        const partialParkings = (0, parking_utils_1.getPartialParkings)(parkings);
        // return neccessary data
        res.status(200).json(partialParkings);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to get parkings" });
    }
}));
// Route to get a parking given an ID
exports.parkingController.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parkingId = req.params.id;
        const parking = yield parking_model_1.Parking.findOne({
            _id: parkingId,
        });
        if (!parking) {
            return res.status(404).json({ message: "Parking not found" });
        }
        res.status(200).json(parking);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to get parking" });
    }
}));
// Route to update a parking given an ID
exports.parkingController.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parkingId = req.params.id;
        const parkingData = req.body;
        if (!parkingData || Object.keys(parkingData).length === 0 || parkingData.owner_id) {
            return res.status(400).json({ message: "Parking data is required" });
        }
        const updatedParking = yield parking_model_1.Parking.findOneAndUpdate({ id: parkingId }, parkingData, { new: true });
        if (!updatedParking) {
            return res.status(404).json({ message: "Parking not found" });
        }
        res.status(200).json(updatedParking);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update parking" });
    }
}));
exports.parkingController.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parkingData = req.body;
    try {
        if (!parkingData || Object.keys(parkingData).length === 0) {
            return res.status(400).json({ message: "Parking data is required" });
        }
        const parkingObj = (0, parking_utils_1.assembleNewParkingBody)(parkingData);
        yield parking_model_1.Parking.validate(parkingObj);
        const newParking = yield parking_model_1.Parking.create(parkingObj);
        res.status(201).json(newParking);
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Failed to create parking", error });
    }
}));
//# sourceMappingURL=parking-api.js.map