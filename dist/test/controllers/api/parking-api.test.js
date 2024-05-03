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
// @ts-nocheck
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../src/app"));
const parking_model_1 = require("../../../src/models/parking-model");
const dayjs_1 = __importDefault(require("dayjs"));
const dayjsPluginUTC = __importStar(require("dayjs/plugin/utc"));
dayjs_1.default.extend(dayjsPluginUTC.default);
jest.mock("../../../src/clients/db-client", () => {
    return {
        returnDbClient: jest.fn().mockResolvedValue(null),
    };
});
jest.mock("../../../src/models/parking-model", () => ({
    Parking: {
        find: jest
            .fn()
            .mockImplementationOnce(() => {
            return parkings;
        })
            .mockImplementationOnce(() => {
            throw new Error();
        }),
        findOne: jest
            .fn()
            .mockImplementationOnce(() => {
            return null;
        })
            .mockImplementationOnce(() => {
            return expectedPartialParking1;
        })
            .mockImplementationOnce(() => {
            throw new Error();
        }),
        findOneAndUpdate: jest
            .fn()
            .mockImplementationOnce(() => {
            return null;
        })
            .mockImplementationOnce(() => {
            return parking1;
        })
            .mockImplementationOnce(() => {
            throw new Error();
        }),
        validate: jest
            .fn()
            .mockImplementationOnce(() => {
            throw new Error();
        })
            .mockImplementationOnce(() => {
            return;
        })
            .mockImplementationOnce(() => {
            return;
        }),
        create: jest
            .fn()
            .mockImplementationOnce(() => {
            throw new Error();
        })
            .mockImplementationOnce(() => {
            return;
        }),
        findOneAndDelete: jest
            .fn()
            .mockImplementationOnce(() => {
            return null;
        })
            .mockImplementationOnce(() => {
            return parkingUsedForDelete;
        })
            .mockImplementationOnce(() => {
            throw new Error();
        }),
    },
}));
const parking1 = {
    _id: 1,
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
    _id: 2,
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
    length: 4,
    width: 4,
};
const parkingUsedForDelete = {
    _id: 3,
    owner_id: "3",
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
const expectedPartialParking1 = {
    _id: 1,
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
    _id: 2,
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
describe("Parking API", () => {
    jest.useFakeTimers().setSystemTime(new Date());
    // Mock the empty parking object here to get correct timestamps
    const emptyParkingObject = {
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
    describe("GET /", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it("should return 200 and return partial parkings", () => __awaiter(void 0, void 0, void 0, function* () {
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default).get("/v1/parking/");
            // Assert the response
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expectedPartialParkings);
            // Add more assertions as needed
        }));
        it("should return 500 if an error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default).get("/v1/parking/");
            // Assert the response
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: "Failed to get parkings" });
            // Add more assertions as needed
        }));
    });
    describe("GET /:id", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it("should return 404 if parking with given id not found", () => __awaiter(void 0, void 0, void 0, function* () {
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default).get("/v1/parking/123");
            // Assert the response
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: "Parking not found" });
            // Add more assertions as needed
        }));
        it("should return 200 and return full parking", () => __awaiter(void 0, void 0, void 0, function* () {
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default).get("/v1/parking/123");
            // Assert the response
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expectedPartialParkings[0]);
            // Add more assertions as needed
        }));
        it("should return 500 if an error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default).get("/v1/parking/123");
            // Assert the response
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: "Failed to get parking" });
            // Add more assertions as needed
        }));
    });
    describe("DELETE /:id", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        const requestBody = {
            parking_id: "3",
            owner_id: "3",
        };
        it("should return 400 if body is null", () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock request body
            const requestBody = null;
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default)
                .delete("/v1/parking/")
                .send(requestBody);
            // Assert the response
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: "Parking Data is required" });
            // Add more assertions as needed
        }));
        it("should return 404 if parking with given id not found", () => __awaiter(void 0, void 0, void 0, function* () {
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default)
                .delete("/v1/parking/")
                .send(requestBody);
            // Assert the response
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: "Parking not found" });
            // Add more assertions as needed
        }));
        it("should return 200 and delete the parking", () => __awaiter(void 0, void 0, void 0, function* () {
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default)
                .delete("/v1/parking/")
                .send(requestBody);
            // Assert the response
            expect(response.status).toBe(200);
            expect(response.body).toEqual(parkingUsedForDelete._id);
            // Add more assertions as needed
        }));
        it("should return 500 if an error occurs while deleting the parking", () => __awaiter(void 0, void 0, void 0, function* () {
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default)
                .delete("/v1/parking/")
                .send(requestBody);
            // Assert the response
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: "Failed to delete parking" });
            // Add more assertions as needed
        }));
    });
    describe("PUT /:id", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it("should return 400 if body is null", () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock request body
            const requestBody = null;
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default)
                .put("/v1/parking/1")
                .send(requestBody);
            // Assert the response
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: "Parking data is required" });
            // Add more assertions as needed
        }));
        it("should return 400 if body is {}", () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock request body
            const requestBody = {};
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default)
                .put("/v1/parking/1")
                .send(requestBody);
            // Assert the response
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: "Parking data is required" });
            // Add more assertions as needed
        }));
        it("should return 404 if parking with given id not found", () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock request body
            const requestBody = {
                id: "123",
                owner_id: "123",
            };
            const { owner_id: _ } = requestBody, safeParkingDataAttributes = __rest(requestBody, ["owner_id"]);
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default)
                .put("/v1/parking/1")
                .send(requestBody);
            // Assert the response
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: "Parking not found" });
            expect(parking_model_1.Parking.findOneAndUpdate).toHaveBeenCalledTimes(1);
            expect(parking_model_1.Parking.findOneAndUpdate).toHaveBeenCalledWith({ id: "1", owner_id: "123" }, safeParkingDataAttributes, { new: true });
            // Add more assertions as needed
        }));
        it("should return 200 and update the parking", () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock request body
            const requestBody = {
                id: "123",
                owner_id: "123",
            };
            const { owner_id: _ } = requestBody, safeParkingDataAttributes = __rest(requestBody, ["owner_id"]);
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default)
                .put("/v1/parking/1")
                .send(requestBody);
            // Assert the response
            expect(response.status).toBe(200);
            expect(parking_model_1.Parking.findOneAndUpdate).toHaveBeenCalledTimes(1);
            expect(parking_model_1.Parking.findOneAndUpdate).toHaveBeenCalledWith({ id: "1", owner_id: "123" }, safeParkingDataAttributes, { new: true });
            // Add more assertions as needed
        }));
        it("should return 500 if an error occurs while updating the parking", () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock request body
            const requestBody = {
                id: "123",
                owner_id: "123",
            };
            const { owner_id: _ } = requestBody, safeParkingDataAttributes = __rest(requestBody, ["owner_id"]);
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default)
                .put("/v1/parking/1")
                .send(requestBody);
            // Assert the response
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: "Failed to update parking" });
            expect(parking_model_1.Parking.findOneAndUpdate).toHaveBeenCalledTimes(1);
            expect(parking_model_1.Parking.findOneAndUpdate).toHaveBeenCalledWith({ id: "1", owner_id: "123" }, safeParkingDataAttributes, { new: true });
        }));
    });
    describe("POST /", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it("should return 400 if body is null", () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock request body
            const requestBody = null;
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default)
                .post("/v1/parking/")
                .send(requestBody);
            // Assert the response
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: "Parking data is required" });
            // Add more assertions as needed
        }));
        it("should return 400 if body is {}", () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock request body
            const requestBody = {};
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default)
                .post("/v1/parking/")
                .send(requestBody);
            // Assert the response
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: "Parking data is required" });
            // Add more assertions as needed
        }));
        it("should return 500 if validation fails while creating the parking", () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock request body
            const requestBody = {
                id: "123",
            };
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default)
                .post("/v1/parking/")
                .send(requestBody);
            // Assert the response
            expect(parking_model_1.Parking.validate).toHaveBeenCalledTimes(1);
            expect(parking_model_1.Parking.validate).toHaveBeenCalledWith(emptyParkingObject);
            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                message: "Failed to create parking",
                error: {},
            });
        }));
        it("should return 500 if creating the parking fails", () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock request body
            const requestBody = {
                id: "123",
            };
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default)
                .post("/v1/parking/")
                .send(requestBody);
            // Assert the response
            expect(parking_model_1.Parking.validate).toHaveBeenCalledTimes(1);
            expect(parking_model_1.Parking.validate).toHaveBeenCalledWith(emptyParkingObject);
            expect(parking_model_1.Parking.create).toHaveBeenCalledTimes(1);
            expect(parking_model_1.Parking.create).toHaveBeenCalledWith(emptyParkingObject);
            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                message: "Failed to create parking",
                error: {},
            });
        }));
        it("should return 201 and create a new parking", () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock request body
            const requestBody = {
                id: "123",
            };
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default)
                .post("/v1/parking/")
                .send(requestBody);
            // Assert the response
            expect(response.status).toBe(201);
            expect(parking_model_1.Parking.validate).toHaveBeenCalledTimes(1);
            expect(parking_model_1.Parking.create).toHaveBeenCalledTimes(1);
            expect(parking_model_1.Parking.create).toHaveBeenCalledWith(emptyParkingObject);
            // Add more assertions as needed
        }));
    });
});
//# sourceMappingURL=parking-api.test.js.map