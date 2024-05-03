"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
// mock the db client
jest.mock("../src/clients/db-client", () => {
    return {
        returnDbClient: jest.fn().mockResolvedValue(null),
    };
});
describe("GET /test-route", () => {
    it("should return 200 OK", () => {
        return (0, supertest_1.default)(app_1.default).get("/sa/test-route")
            .expect(200);
    });
});
//# sourceMappingURL=app.test.js.map