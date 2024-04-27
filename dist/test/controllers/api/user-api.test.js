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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../src/app"));
const user_model_1 = require("../../../src/models/user-model");
const testUser = {
    id: "123",
    name: "saksham ahluwalia",
    provider: "google",
    email: "test@test.com",
    images: ["https://www.google.com"],
    verified: true,
    contactNumber: "+16474704180",
};
const testPartialUser = {
    id: "123",
    name: "saksham ahluwalia",
    images: ["https://www.google.com"],
    verified: true,
    contactNumber: "+16474704180",
};
jest.mock("../../../src/clients/db-client", () => {
    return {
        returnDbClient: jest.fn().mockResolvedValue(null),
    };
});
jest.mock("../../../src/models/user-model", () => ({
    User: {
        findOneAndUpdate: jest
            .fn()
            .mockImplementationOnce(() => {
            return null;
        })
            .mockImplementationOnce(() => {
            return {
                contactNumber: null,
            };
        })
            .mockImplementationOnce(() => {
            throw new Error("Internal server error");
        })
            .mockImplementationOnce(() => {
            return null;
        })
            .mockImplementationOnce(() => {
            return {
                id: "123",
                name: "saksham ahluwalia",
                provider: "google",
                email: "s@g.com",
                images: ["https://www.google.com"],
                verified: true,
                contactNumber: "+16474704180",
                verification_img: ["https://www.google.com"],
            };
        })
            .mockImplementationOnce(() => {
            throw new Error();
        }),
        validate: jest.fn(),
        findOne: jest
            .fn()
            .mockImplementationOnce(() => {
            return null;
        })
            .mockImplementationOnce(() => {
            return testUser;
        })
            .mockImplementationOnce(() => {
            throw new Error("Internal server error");
        }),
    },
}));
describe("User API", () => {
    describe("PUT /:id", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it("should return 400 if body is incomplete", () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock request body
            const requestBody = {};
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default).put("/v1/user/123").send(requestBody);
            // Assert the response
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: "User data is required" });
            // Add more assertions as needed
        }));
        it("should return 400 if body has id in it", () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock request body
            const requestBody = {
                id: "123",
            };
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default)
                .put("/v1/user/complete-sign-up")
                .send(requestBody);
            // Assert the response
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: "User data is required" });
            // Add more assertions as needed
        }));
        it("should return 404 if user with given id not found", () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock request body
            const requestBody = {
                contactInfo: "1234567890",
            };
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default).put("/v1/user/123").send(requestBody);
            // Assert the response
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: "User not found" });
            // Add more assertions as needed
        }));
        it("should return 200 and update the user's contact information", () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock request body
            const requestBody = {
                contactInfo: "1234567890",
            };
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default).put("/v1/user/123").send(requestBody);
            // Assert the response
            expect(response.status).toBe(200);
            expect(user_model_1.User.findOneAndUpdate).toHaveBeenCalledTimes(1);
            expect(user_model_1.User.findOneAndUpdate).toHaveBeenCalledWith({ id: "123" }, { contactInfo: "1234567890" }, { new: true });
            // Add more assertions as needed
        }));
        it("should return 500 if an error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock request body
            const requestBody = {
                contactInfo: "1234567890",
            };
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default).put("/v1/user/123").send(requestBody);
            // Assert the response
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: "Internal server error" });
            // Add more assertions as needed
        }));
    });
    describe("GET /:id", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it("should return 404 if user with given id not found", () => __awaiter(void 0, void 0, void 0, function* () {
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default).get("/v1/user/123");
            // Assert the response
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: "User not found" });
            // Add more assertions as needed
        }));
        it("should return 200 and return partial user", () => __awaiter(void 0, void 0, void 0, function* () {
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default).get("/v1/user/123");
            // Assert the response
            expect(response.status).toBe(200);
            expect(response.body).toEqual(testPartialUser);
            // Add more assertions as needed
        }));
        it("should return 500 if an error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default).get("/v1/user/123");
            // Assert the response
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: "Internal server error" });
            // Add more assertions as needed
        }));
    });
});
//# sourceMappingURL=user-api.test.js.map