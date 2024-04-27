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
const testAddress = "123 Main St, Springfield, IL 62701";
const mockGeoCodeSuccessResponse = {
    lat: 1,
    lng: 1,
    sucess: true,
};
const mockGeoCodeFailureResponse = {
    lat: -1,
    lng: -1,
    success: false,
};
jest.mock("../../../src/controllers/utils/geocode-utils", () => {
    return {
        geocode: jest
            .fn()
            .mockImplementationOnce(() => {
            return mockGeoCodeSuccessResponse;
        })
            .mockImplementationOnce(() => {
            return mockGeoCodeFailureResponse;
        }),
    };
});
jest.mock("../../../src/clients/db-client", () => {
    return {
        returnDbClient: jest.fn().mockResolvedValue(null),
    };
});
describe("Geocode-api", () => {
    describe("POST /geocode", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it("should return 400 when address is not provided", () => __awaiter(void 0, void 0, void 0, function* () {
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default).post("/v1/geocode").send({});
            // Assert the response
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: "Address is required" });
        }));
        it("should return 200 and return GeocodeUtilFunctionResponse response object", () => __awaiter(void 0, void 0, void 0, function* () {
            const expectedResponse = mockGeoCodeSuccessResponse;
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default).post("/v1/geocode").send({
                address: testAddress,
            });
            // Assert the response
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expectedResponse);
            // Add more assertions as needed
        }));
        it("should return 500 and return GeocodeUtilFunctionResponse response object", () => __awaiter(void 0, void 0, void 0, function* () {
            const expectedResponse = mockGeoCodeFailureResponse;
            // Make the request
            const response = yield (0, supertest_1.default)(app_1.default).post("/v1/geocode").send({
                address: testAddress,
            });
            // Assert the response
            expect(response.status).toBe(500);
            expect(response.body).toEqual(expectedResponse);
        }));
    });
});
//# sourceMappingURL=geocode-api.test.js.map