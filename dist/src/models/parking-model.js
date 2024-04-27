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
exports.Parking = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const user_model_1 = require("./user-model");
const parkingSchema = new mongoose_1.Schema({
    owner_id: { type: String, required: false },
    filters: {
        security_cameras: { type: Boolean, required: true },
        full_day_access: { type: Boolean, required: true },
        ev_charging: { type: Boolean, required: true },
        handicap_accessible: { type: Boolean, required: true },
        storage_type: { type: String, required: true },
        vehicle_type: { type: String, required: true },
        length: { type: Number, required: true },
        width: { type: Number, required: true },
        spaces: { type: Number, required: true },
    },
    address: {
        street: { type: String, required: true },
        lng: { type: String, required: true },
        lat: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
        zip: { type: String, required: true },
        country: { type: String, required: true },
    },
    description: { type: String, required: true },
    price: {
        hourly: { type: Number, required: false },
        daily: { type: Number, required: true },
        monthly: { type: Number, required: true },
        yearly: { type: Number, required: false },
    },
    is_available: { type: Boolean, required: true },
    images: { type: [String], required: true },
    listed_on: { type: String, required: false },
    is_scraped: { type: Boolean, required: false },
    contact: { type: String, required: true },
});
parkingSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const lat = this.address.lat;
        const lng = this.address.lng;
        const isScrapedListing = this.is_scraped;
        const contact = this.contact;
        const owner_id = this.owner_id;
        try {
            let isExisting = yield exports.Parking.findOne({
                "address.lat": lat,
                "address.lng": lng,
            });
            if (isScrapedListing) {
                if (isExisting) {
                    throw new Error("Duplicate scraped listing found");
                }
                if (contact) {
                    next();
                }
                throw new Error("Contact should exist for scraped listing");
            }
            else {
                const user = yield user_model_1.User.findOne({ id: owner_id });
                isExisting = yield exports.Parking.findOne({
                    "address.lat": lat,
                    "address.lng": lng,
                    owner_id,
                });
                if (isExisting) {
                    throw new Error("Duplicate listing found");
                }
                if (user) {
                    next();
                }
                else {
                    throw new Error("Owner should exist for each listing");
                }
            }
        }
        catch (error) {
            throw error;
        }
    });
});
exports.Parking = mongoose_1.default.model("Parking", parkingSchema);
//# sourceMappingURL=parking-model.js.map