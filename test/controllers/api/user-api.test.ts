// @ts-nocheck
import request from "supertest";
import app from "../../../src/app";
import { User } from "../../../src/models/user-model";

jest.mock("../../../src/clients/db-client", () => {
  return {
    returnDbClient: jest.fn().mockResolvedValue(null),
  };
});

jest.mock("../../../src/models/user-model", () => ({
  User: {
    findOne: jest
      .fn()
      .mockImplementationOnce(() => {
        return null;
      })
      .mockImplementationOnce(() => {
        return {
          contactNumber: "1234567890",
        };
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
    updateOne: jest.fn(),
  },
}));

describe("User API", () => {
  describe("PUT /complete-sign-up", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return 400 if body is incomplete", async () => {
      // Mock request body
      const requestBody = {
        id: "123",
      };

      // Make the request
      const response = await request(app)
        .put("/v1/user/complete-sign-up")
        .send(requestBody);

      // Assert the response
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Missing required fields" });
      // Add more assertions as needed
    });

    it("should return 400 if body is incomplete - 2", async () => {
      // Mock request body
      const requestBody = {
        contactInfo: "1234567890",
      };

      // Make the request
      const response = await request(app)
        .put("/v1/user/complete-sign-up")
        .send(requestBody);

      // Assert the response
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Missing required fields" });
      // Add more assertions as needed
    });

    it("should return 404 if user with given id not found", async () => {
      // Mock request body
      const requestBody = {
        id: "123",
        contactInfo: "1234567890",
      };

      // Make the request
      const response = await request(app)
        .put("/v1/user/complete-sign-up")
        .send(requestBody);

      // Assert the response
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "User not found" });
      // Add more assertions as needed
    });

    it("should return 400 if user already completed sign up", async () => {
      // Mock request body
      const requestBody = {
        id: "123",
        contactInfo: "1234567890",
      };

      // Make the request
      const response = await request(app)
        .put("/v1/user/complete-sign-up")
        .send(requestBody);

      // Assert the response
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "User already completed sign up",
      });
      // Add more assertions as needed
    });

    it("should return 204 and update the user's contact information", async () => {
      // Mock request body
      const requestBody = {
        id: "123",
        contactInfo: "1234567890",
      };

      // Make the request
      const response = await request(app)
        .put("/v1/user/complete-sign-up")
        .send(requestBody);

      // Assert the response
      expect(response.status).toBe(204);
      expect(User.updateOne).toHaveBeenCalledTimes(1);
      expect(User.updateOne).toHaveBeenCalledWith(
        { id: "123" },
        { contactNumber: "1234567890" }
      );
      // Add more assertions as needed
    });

    it("should return 500 if an error occurs", async () => {
      // Mock request body
      const requestBody = {
        id: "123",
        contactInfo: "1234567890",
      };

      // Make the request
      const response = await request(app)
        .put("/v1/user/complete-sign-up")
        .send(requestBody);

      // Assert the response
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Internal server error" });
      // Add more assertions as needed
    });
  });

  describe("GET /:id", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return 404 if user with given id not found", async () => {
      // Make the request
      const response = await request(app).get("/v1/user/123");

      // Assert the response
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "User not found" });
      // Add more assertions as needed
    });

    it("should return 200 and return partial user", async () => {
      // Make the request
      const response = await request(app).get("/v1/user/123");

      // Assert the response
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        name: "saksham ahluwalia",
        images: ["https://www.google.com"],
        verified: true,
        contactNumber: "+16474704180",
      });

      // Add more assertions as needed
    });

    it("should return 500 if an error occurs", async () => {
      // Make the request
      const response = await request(app).get("/v1/user/123");

      // Assert the response
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Internal server error" });
      // Add more assertions as needed
    });
  });
});
