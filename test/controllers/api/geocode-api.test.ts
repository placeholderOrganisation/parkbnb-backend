// @ts-nocheck
import request from "supertest";
import app from "../../../src/app";

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

    it("should return 400 when address is not provided", async () => {
      // Make the request
      const response = await request(app).post("/v1/geocode").send({});

      // Assert the response
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "Address is required" });
    });

    it("should return 200 and return GeocodeUtilFunctionResponse response object", async () => {
      const expectedResponse = mockGeoCodeSuccessResponse;

      // Make the request
      const response = await request(app).post("/v1/geocode").send({
        address: testAddress,
      });

      // Assert the response
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResponse);
      // Add more assertions as needed
    });

    it("should return 500 and return GeocodeUtilFunctionResponse response object", async () => {
      const expectedResponse = mockGeoCodeFailureResponse;

      // Make the request
      const response = await request(app).post("/v1/geocode").send({
        address: testAddress,
      });

      // Assert the response
      expect(response.status).toBe(500);
      expect(response.body).toEqual(expectedResponse);
    });
  });
});
