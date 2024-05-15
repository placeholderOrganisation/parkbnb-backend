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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
exports.parkingController.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parkingId = req.body.parking_id;
        const ownwerId = req.body.owner_id;
        if (!parkingId || !ownwerId) {
            return res.status(400).json({ message: "Parking Data is required" });
        }
        const deletedParking = yield parking_model_1.Parking.findOneAndDelete({ _id: parkingId, owner_id: ownwerId });
        if (!deletedParking) {
            return res.status(404).json({ message: "Parking not found" });
        }
        res.status(200).json(deletedParking._id);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete parking" });
    }
}));
// Route to update a parking given an ID
exports.parkingController.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parkingId = req.params.id;
        const owner_id = req.body.owner_id;
        const parkingData = req.body;
        const { owner_id: _ } = parkingData, safeParkingDataAttributes = __rest(parkingData, ["owner_id"]);
        if (!safeParkingDataAttributes ||
            Object.keys(safeParkingDataAttributes).length === 0 ||
            !owner_id) {
            return res.status(400).json({ message: "Parking data is required" });
        }
        const updatedParking = yield parking_model_1.Parking.findOneAndUpdate({ _id: parkingId, owner_id: owner_id }, safeParkingDataAttributes, { new: true });
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
// Route to get all parkings which are owned by a user
exports.parkingController.get("/user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const parkings = yield parking_model_1.Parking.find({ owner_id: userId });
        const partialParkings = (0, parking_utils_1.getPartialParkings)(parkings);
        res.status(200).json(partialParkings);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to get parkings" });
    }
}));
//# sourceMappingURL=parking-api.js.map