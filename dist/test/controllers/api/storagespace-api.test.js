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
// @ts-nocheck
// @ts-nocheck
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../src/app"));
const storagespace_model_1 = require("../../../src/models/storagespace-model");
jest.mock("../../../src/clients/db-client", () => {
    return {
        returnDbClient: jest.fn().mockResolvedValue(null),
    };
});
jest.mock("../../../src/models/storagespace-model", () => ({
    StorageSpace: {
        find: jest
            .fn()
            .mockImplementationOnce(() => {
            return storagespaces;
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
            return storageSpace1;
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
            return storageSpace1;
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
    },
}));
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
describe("Storagespace API", () => {
    describe("GET /", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it("should return 200 and return partial storagespaces", () => __awaiter(void 0, void 0, void 0, function* () {
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default).get("/v1/storagespace/");
            // Assert the response
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expectedPartialStorageSpaces);
            // Add more assertions as needed
        }));
        it("should return 500 if an error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default).get("/v1/storagespace/");
            // Assert the response
            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                message: "Failed to get storage spaces",
            });
            // Add more assertions as needed
        }));
    });
    describe("GET /:id", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it("should return 404 if storagespace with given id not found", () => __awaiter(void 0, void 0, void 0, function* () {
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default).get("/v1/storagespace/123");
            // Assert the response
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: "storage space not found" });
            // Add more assertions as needed
        }));
        it("should return 200 and return full storage space", () => __awaiter(void 0, void 0, void 0, function* () {
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default).get("/v1/storagespace/123");
            // Assert the response
            expect(response.status).toBe(200);
            expect(response.body).toEqual(storageSpace1);
            // Add more assertions as needed
        }));
        it("should return 500 if an error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default).get("/v1/storagespace/123");
            // Assert the response
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: "Failed to get storage space" });
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
                .put("/v1/storagespace/1")
                .send(requestBody);
            // Assert the response
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: "storage space data is required" });
            // Add more assertions as needed
        }));
        it("should return 400 if body is {}", () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock request body
            const requestBody = {};
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default)
                .put("/v1/storagespace/1")
                .send(requestBody);
            // Assert the response
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: "storage space data is required" });
            // Add more assertions as needed
        }));
        it("should return 404 if storagespace with given id not found", () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock request body
            const requestBody = {
                id: "123",
            };
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default)
                .put("/v1/storagespace/1")
                .send(requestBody);
            // Assert the response
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: "storage space not found" });
            expect(storagespace_model_1.StorageSpace.findOneAndUpdate).toHaveBeenCalledTimes(1);
            expect(storagespace_model_1.StorageSpace.findOneAndUpdate).toHaveBeenCalledWith({ id: "1" }, requestBody, { new: true });
            // Add more assertions as needed
        }));
        it("should return 200 and update the storagespace", () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock request body
            const requestBody = {
                id: "123",
            };
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default)
                .put("/v1/storagespace/1")
                .send(requestBody);
            // Assert the response
            expect(response.status).toBe(200);
            expect(storagespace_model_1.StorageSpace.findOneAndUpdate).toHaveBeenCalledTimes(1);
            expect(storagespace_model_1.StorageSpace.findOneAndUpdate).toHaveBeenCalledWith({ id: "1" }, requestBody, { new: true });
            // Add more assertions as needed
        }));
        it("should return 500 if an error occurs while updating the parking", () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock request body
            const requestBody = {
                id: "123",
            };
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default)
                .put("/v1/storagespace/1")
                .send(requestBody);
            // Assert the response
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: "Failed to update storage space" });
            expect(storagespace_model_1.StorageSpace.findOneAndUpdate).toHaveBeenCalledTimes(1);
            expect(storagespace_model_1.StorageSpace.findOneAndUpdate).toHaveBeenCalledWith({ id: "1" }, requestBody, { new: true });
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
                .post("/v1/storagespace/")
                .send(requestBody);
            // Assert the response
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: "storage space data is required" });
            // Add more assertions as needed
        }));
        it("should return 400 if body is {}", () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock request body
            const requestBody = {};
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default)
                .post("/v1/storagespace/")
                .send(requestBody);
            // Assert the response
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: "storage space data is required" });
            // Add more assertions as needed
        }));
        it("should return 500 if validation fails while creating the storagespace", () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock request body
            const requestBody = {
                id: "123",
            };
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default)
                .post("/v1/storagespace/")
                .send(requestBody);
            // Assert the response
            expect(storagespace_model_1.StorageSpace.validate).toHaveBeenCalledTimes(1);
            expect(storagespace_model_1.StorageSpace.validate).toHaveBeenCalledWith(requestBody);
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: "Failed to create storage space" });
        }));
        it("should return 500 if creating the storagespace fails", () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock request body
            const requestBody = {
                id: "123",
            };
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default)
                .post("/v1/storagespace/")
                .send(requestBody);
            // Assert the response
            expect(storagespace_model_1.StorageSpace.validate).toHaveBeenCalledTimes(1);
            expect(storagespace_model_1.StorageSpace.validate).toHaveBeenCalledWith(requestBody);
            expect(storagespace_model_1.StorageSpace.create).toHaveBeenCalledTimes(1);
            expect(storagespace_model_1.StorageSpace.create).toHaveBeenCalledWith(requestBody);
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: "Failed to create storage space" });
        }));
        it("should return 201 and create a new storagespace", () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock request body
            const requestBody = {
                id: "123",
            };
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default)
                .post("/v1/storagespace/")
                .send(requestBody);
            // Assert the response
            expect(response.status).toBe(201);
            expect(storagespace_model_1.StorageSpace.validate).toHaveBeenCalledTimes(1);
            expect(storagespace_model_1.StorageSpace.create).toHaveBeenCalledTimes(1);
            expect(storagespace_model_1.StorageSpace.create).toHaveBeenCalledWith(requestBody);
            // Add more assertions as needed
        }));
    });
});
//# sourceMappingURL=storagespace-api.test.js.map