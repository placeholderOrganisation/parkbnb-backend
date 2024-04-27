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
Object.defineProperty(exports, "__esModule", { value: true });
exports.geocodingController = void 0;
const express_1 = require("express");
const geocode_utils_1 = require("../utils/geocode-utils");
// going to contain routes to expose mapbox api from my app
exports.geocodingController = (0, express_1.Router)();
// Route to call the geocode function
exports.geocodingController.post("", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = req.body.address;
        if (!address) {
            return res.status(400).json({ error: "Address is required" });
        }
        const result = yield (0, geocode_utils_1.geocode)(address);
        if (result.success === false) {
            return res.status(500).json(result);
        }
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
//# sourceMappingURL=geocode-api.js.map