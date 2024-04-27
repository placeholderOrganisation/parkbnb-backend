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
// @ts-nocheck
const parking_utils_1 = require("../../../src/controllers/utils/parking-utils");
const dayjs_1 = __importDefault(require("dayjs"));
const dayjsPluginUTC = __importStar(require("dayjs/plugin/utc"));
dayjs_1.default.extend(dayjsPluginUTC.default);
const parking1 = {
    parking_id: 1,
    owner_id: "1",
    filters: {
        security_cameras: true,
        full_day_access: true,
        ev_charging: true,
        handicap_accessible: true,
        storage_type: "outdoor",
        vehicle_type: "sedan / suv",
        length: 5,
        width: 3,
        spaces: 1,
    },
    address: {
        street: "1234 5th Ave",
        lng: 123.123,
        lat: 123.123,
        city: "New York",
        state: "NY",
        zip: 10001,
        country: "USA",
    },
    description: "parking spot in the back",
    price: { hourly: 5, daily: 50, monthly: 500, yearly: 5000 },
    is_available: true,
    images: ["image1.jpg", "image2.jpg"],
    listed_on: "2021-05-05 12:00:00",
};
const parking2 = {
    parking_id: 2,
    owner_id: "2",
    filters: {
        security_cameras: true,
        full_day_access: true,
        ev_charging: true,
        handicap_accessible: true,
        storage_type: "outdoor",
        vehicle_type: "sedan / suv",
        length: 4,
        width: 4,
        spaces: 1,
    },
    address: {
        street: "1234 5th Ave",
        lng: 123.123,
        lat: 123.123,
        city: "San Francisco",
        state: "NY",
        zip: 10001,
        country: "USA",
    },
    description: "parking spot in the back",
    price: { hourly: 5, daily: 50, monthly: 1500, yearly: 5000 },
    is_available: true,
    images: ["image3.jpg", "image4.jpg"],
    listed_on: "2021-05-05 12:00:00",
};
const expectedPartialParking1 = {
    owner_id: "1",
    filters: {
        security_cameras: true,
        full_day_access: true,
        ev_charging: true,
        handicap_accessible: true,
        storage_type: "outdoor",
        vehicle_type: "sedan / suv",
        length: 5,
        width: 3,
        spaces: 1,
    },
    address: {
        street: "1234 5th Ave",
        lng: 123.123,
        lat: 123.123,
        city: "New York",
        state: "NY",
        zip: 10001,
        country: "USA",
    },
    description: "parking spot in the back",
    price: { daily: 50, monthly: 500 },
    is_available: true,
    images: ["image1.jpg", "image2.jpg"],
    listed_on: "2021-05-05 12:00:00",
    is_scraped: false,
};
const expectedPartialParking2 = {
    owner_id: "2",
    filters: {
        security_cameras: true,
        full_day_access: true,
        ev_charging: true,
        handicap_accessible: true,
        storage_type: "outdoor",
        vehicle_type: "sedan / suv",
        length: 4,
        width: 4,
        spaces: 1,
    },
    address: {
        street: "1234 5th Ave",
        lng: 123.123,
        lat: 123.123,
        city: "San Francisco",
        state: "NY",
        zip: 10001,
        country: "USA",
    },
    description: "parking spot in the back",
    price: { daily: 50, monthly: 1500 },
    is_available: true,
    images: ["image3.jpg", "image4.jpg"],
    listed_on: "2021-05-05 12:00:00",
    is_scraped: false,
};
const parkings = [parking1, parking2];
const expectedPartialParkings = [
    expectedPartialParking1,
    expectedPartialParking2,
];
const expectedEmptyParking = {
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
describe("getPartialParkingObject", () => {
    it("should return a partial parking objects", () => {
        const result = (0, parking_utils_1.getPartialParkingObject)(parking1);
        expect(result).toEqual(expectedPartialParking1);
    });
});
describe("getPartialParkings", () => {
    it("should return an array of partial parking objects", () => {
        const result = (0, parking_utils_1.getPartialParkings)(parkings);
        expect(result).toEqual(expectedPartialParkings);
    });
});
describe("initializeEmptyParking", () => {
    it("should return an empty parking object", () => {
        jest.useFakeTimers().setSystemTime(new Date());
        expectedEmptyParking.listed_on = dayjs_1.default.utc();
        const result = (0, parking_utils_1.initializeEmptyParking)();
        expect(result).toEqual(expectedEmptyParking);
        jest.useRealTimers();
    });
});
//# sourceMappingURL=parking-utils.test.js.map