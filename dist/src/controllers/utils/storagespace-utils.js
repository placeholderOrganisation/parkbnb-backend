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
exports.initializeEmptyStorageSpace = exports.getPartialStorageSpaceObject = exports.getPartialStorageSpaces = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const dayjsPluginUTC = __importStar(require("dayjs/plugin/utc"));
dayjs_1.default.extend(dayjsPluginUTC.default);
const getPartialStorageSpaces = (storagespaces) => {
    return storagespaces.map((storagespace) => {
        return (0, exports.getPartialStorageSpaceObject)(storagespace);
    });
};
exports.getPartialStorageSpaces = getPartialStorageSpaces;
const getPartialStorageSpaceObject = (storagespace) => {
    const { owner_id, address, price, is_available, images, length, width, } = storagespace;
    return {
        owner_id,
        address: {
            lat: address.lat,
            lng: address.lng,
            street: address.street,
            city: address.city,
            state: address.state,
            zip: address.zip,
            country: address.country,
        },
        price: {
            monthly: price.monthly,
        },
        is_available,
        images,
        length,
        width,
    };
};
exports.getPartialStorageSpaceObject = getPartialStorageSpaceObject;
const initializeEmptyStorageSpace = () => {
    const newStorageSpaceObject = {
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
    return newStorageSpaceObject;
};
exports.initializeEmptyStorageSpace = initializeEmptyStorageSpace;
//# sourceMappingURL=storagespace-utils.js.map