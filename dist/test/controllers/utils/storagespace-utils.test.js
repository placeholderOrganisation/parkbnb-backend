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
const storagespace_utils_1 = require("../../../src/controllers/utils/storagespace-utils");
const dayjs_1 = __importDefault(require("dayjs"));
const dayjsPluginUTC = __importStar(require("dayjs/plugin/utc"));
dayjs_1.default.extend(dayjsPluginUTC.default);
const storageSpace1 = {
    storagespace_id: 1,
    owner_id: "1",
    address: {
        street: "1234 5th Ave",
        lng: 123.123,
        lat: 123.123,
        city: "New York",
        state: "NY",
        zip: 10001,
        country: "USA",
    },
    description: "storagespace spot in the back",
    price: { hourly: 5, daily: 50, monthly: 500, yearly: 5000 },
    is_available: true,
    images: ["image1.jpg", "image2.jpg"],
    listed_on: "2021-05-05 12:00:00",
    length: 5,
    width: 3,
};
const storageSpace2 = {
    storagespace_id: 2,
    owner_id: "2",
    address: {
        street: "1234 5th Ave",
        lng: 123.123,
        lat: 123.123,
        city: "San Francisco",
        state: "NY",
        zip: 10001,
        country: "USA",
    },
    description: "storagespace spot in the back",
    price: { hourly: 5, daily: 50, monthly: 1500, yearly: 5000 },
    is_available: true,
    images: ["image3.jpg", "image4.jpg"],
    listed_on: "2021-05-05 12:00:00",
    length: 4,
    width: 4,
};
const expectedPartialStorageSpace1 = {
    owner_id: "1",
    address: {
        street: "1234 5th Ave",
        lng: 123.123,
        lat: 123.123,
        city: "New York",
        state: "NY",
        zip: 10001,
        country: "USA",
    },
    price: {
        monthly: 500,
    },
    is_available: true,
    images: ["image1.jpg", "image2.jpg"],
    length: 5,
    width: 3,
};
const expectedPartialStorageSpace2 = {
    owner_id: "2",
    address: {
        street: "1234 5th Ave",
        lng: 123.123,
        lat: 123.123,
        city: "San Francisco",
        state: "NY",
        zip: 10001,
        country: "USA",
    },
    price: {
        monthly: 1500,
    },
    is_available: true,
    images: ["image3.jpg", "image4.jpg"],
    length: 4,
    width: 4,
};
const storagespaces = [storageSpace1, storageSpace2];
const expectedPartialStorageSpaces = [
    expectedPartialStorageSpace1,
    expectedPartialStorageSpace2,
];
describe("getPartialStorageSpaceObject", () => {
    it("should return a partial storage space objects", () => {
        const result = (0, storagespace_utils_1.getPartialStorageSpaceObject)(storageSpace1);
        expect(result).toEqual(expectedPartialStorageSpace1);
    });
});
describe("getPartialStorageSpaces", () => {
    it("should return an array of partial storage space objects", () => {
        const result = (0, storagespace_utils_1.getPartialStorageSpaces)(storagespaces);
        expect(result).toEqual(expectedPartialStorageSpaces);
    });
});
describe("initializeEmptyStorageSpace", () => {
    it("should return an empty storage space object", () => {
        const expectedEmptyStorageSpace = {
            owner_id: "",
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
            length: 0,
            width: 0,
        };
        const result = (0, storagespace_utils_1.initializeEmptyStorageSpace)();
        expect(result).toEqual(expectedEmptyStorageSpace);
    });
});
//# sourceMappingURL=storagespace-utils.test.js.map