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
exports.initializeEmptyParking = exports.assembleNewParkingBody = exports.getPartialParkingObject = exports.getPartialParkings = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const dayjsPluginUTC = __importStar(require("dayjs/plugin/utc"));
dayjs_1.default.extend(dayjsPluginUTC.default);
const getPartialParkings = (parkings) => {
    return parkings.map((parking) => {
        return (0, exports.getPartialParkingObject)(parking);
    });
};
exports.getPartialParkings = getPartialParkings;
const getPartialParkingObject = (parking) => {
    const { _id, address, price, is_available, images, filters, description, listed_on, contact, } = parking;
    const is_scraped = parking.is_scraped || false;
    const owner_id = parking.owner_id || null;
    return {
        _id,
        owner_id,
        filters,
        address,
        description,
        price: {
            daily: price.daily,
            monthly: price.monthly,
        },
        is_available,
        images,
        listed_on,
        is_scraped,
        contact,
    };
};
exports.getPartialParkingObject = getPartialParkingObject;
const assembleNewParkingBody = (parkingData) => {
    const emptyParkingObject = (0, exports.initializeEmptyParking)();
    if (parkingData.owner_id) {
        emptyParkingObject.owner_id = parkingData.owner_id;
    }
    if (parkingData.filters) {
        emptyParkingObject.filters = parkingData.filters;
    }
    if (parkingData.address) {
        emptyParkingObject.address = parkingData.address;
    }
    if (parkingData.description) {
        emptyParkingObject.description = parkingData.description;
    }
    if (parkingData.price) {
        emptyParkingObject.price = parkingData.price;
    }
    if (parkingData.is_available) {
        emptyParkingObject.is_available = parkingData.is_available;
    }
    if (parkingData.images) {
        emptyParkingObject.images = parkingData.images;
    }
    if (parkingData.is_scraped) {
        emptyParkingObject.is_scraped = parkingData.is_scraped;
    }
    if (parkingData.contact) {
        emptyParkingObject.contact = parkingData.contact;
    }
    if (parkingData.listed_on) {
        const formattedListedOn = (0, dayjs_1.default)(parkingData.listed_on);
        emptyParkingObject.listed_on = formattedListedOn;
    }
    return emptyParkingObject;
};
exports.assembleNewParkingBody = assembleNewParkingBody;
const initializeEmptyParking = () => {
    const newParkingObject = {
        owner_id: "",
        filters: {
            security_cameras: false,
            full_day_access: false,
            ev_charging: false,
            handicap_accessible: false,
            storage_type: "",
            vehicle_type: "",
            length: 0,
            width: 0,
            spaces: 0,
        },
        address: {
            lat: "",
            lng: "",
            street: "",
            city: "",
            state: "",
            zip: "",
            country: "",
        },
        description: "",
        price: {
            daily: 0,
            monthly: 0,
        },
        is_available: false,
        images: [],
        listed_on: dayjs_1.default.utc(),
        is_scraped: false,
        contact: "",
    };
    return newParkingObject;
};
exports.initializeEmptyParking = initializeEmptyParking;
//# sourceMappingURL=parking-utils.js.map