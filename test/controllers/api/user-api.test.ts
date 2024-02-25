// @ts-nocheck
import request from "supertest";
import app from "../../../src/app";
import { User } from "../../../src/models/user-model";

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

    it("should return 400 if body is incomplete", async () => {
      // Mock request body
      const requestBody = {};

      // Make the request
      const response = await request(app).put("/v1/user/123").send(requestBody);

      // Assert the response
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "User data is required" });
      // Add more assertions as needed
    });

    it("should return 400 if body has id in it", async () => {
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
      expect(response.body).toEqual({ message: "User data is required" });
      // Add more assertions as needed
    });

    it("should return 404 if user with given id not found", async () => {
      // Mock request body
      const requestBody = {
        contactInfo: "1234567890",
      };

      // Make the request
      const response = await request(app).put("/v1/user/123").send(requestBody);

      // Assert the response
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "User not found" });
      // Add more assertions as needed
    });

    it("should return 200 and update the user's contact information", async () => {
      // Mock request body
      const requestBody = {
        contactInfo: "1234567890",
      };

      // Make the request
      const response = await request(app).put("/v1/user/123").send(requestBody);

      // Assert the response
      expect(response.status).toBe(200);
      expect(User.findOneAndUpdate).toHaveBeenCalledTimes(1);
      expect(User.findOneAndUpdate).toHaveBeenCalledWith(
        { id: "123" },
        { contactInfo: "1234567890" },
        { new: true }
      );
      // Add more assertions as needed
    });

    it("should return 500 if an error occurs", async () => {
      // Mock request body
      const requestBody = {
        contactInfo: "1234567890",
      };

      // Make the request
      const response = await request(app).put("/v1/user/123").send(requestBody);

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
      expect(response.body).toEqual(testPartialUser);

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
