// @ts-nocheck
import request from "supertest";
import app from "../src/app";

// mock the db client
jest.mock("../src/clients/db-client", () => {
  return {
    returnDbClient: jest.fn().mockResolvedValue(null),
  };
});

describe("GET /test-route", () => {
  it("should return 200 OK", () => {
      return request(app).get("/test-route")
          .expect(200);
  });
});
