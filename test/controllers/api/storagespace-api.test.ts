// @ts-nocheck
// @ts-nocheck
import request from "supertest";
import app from "../../../src/app";
import { StorageSpaceObject, StorageSpace } from "../../../src/models/storagespace-model";

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
  created_at: "2021-05-05 12:00:00",
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
  created_at: "2021-05-05 12:00:00",
  length: 4,
  width: 4,
};

const expectedPartialStorageSpace1: PartialStorageSpaceObject = {
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

const expectedPartialStorageSpace2: PartialStorageSpaceObject = {
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

const storagespaces: StorageSpaceObject[] = [storageSpace1, storageSpace2];

const expectedPartialStorageSpaces: PartialStorageSpaceObject[] = [
  expectedPartialStorageSpace1,
  expectedPartialStorageSpace2,
];

describe("Storagespace API", () => {
  describe("GET /", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return 200 and return partial storagespaces", async () => {
      // Make the request
      const response = await request(app).get("/v1/storagespace/");

      // Assert the response
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedPartialStorageSpaces);
      // Add more assertions as needed
    });

    it("should return 500 if an error occurs", async () => {
      // Make the request
      const response = await request(app).get("/v1/storagespace/");

      // Assert the response
      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: "Failed to get storage spaces",
      });
      // Add more assertions as needed
    });
  });

  describe("GET /:id", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return 404 if storagespace with given id not found", async () => {
      // Make the request
      const response = await request(app).get("/v1/storagespace/123");

      // Assert the response
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "storage space not found" });
      // Add more assertions as needed
    });

    it("should return 200 and return full storage space", async () => {
      // Make the request
      const response = await request(app).get("/v1/storagespace/123");

      // Assert the response
      expect(response.status).toBe(200);
      expect(response.body).toEqual(storageSpace1);

      // Add more assertions as needed
    });

    it("should return 500 if an error occurs", async () => {
      // Make the request
      const response = await request(app).get("/v1/storagespace/123");

      // Assert the response
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Failed to get storage space" });
      // Add more assertions as needed
    });
  });

  describe("PUT /:id", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return 400 if body is null", async () => {
      // Mock request body
      const requestBody = null;

      // Make the request
      const response = await request(app)
        .put("/v1/storagespace/1")
        .send(requestBody);

      // Assert the response
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "storage space data is required" });
      // Add more assertions as needed
    });

    it("should return 400 if body is {}", async () => {
      // Mock request body
      const requestBody = {};

      // Make the request
      const response = await request(app)
        .put("/v1/storagespace/1")
        .send(requestBody);

      // Assert the response
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "storage space data is required" });
      // Add more assertions as needed
    });

    it("should return 404 if storagespace with given id not found", async () => {
      // Mock request body
      const requestBody = {
        id: "123",
      };

      // Make the request
      const response = await request(app)
        .put("/v1/storagespace/1")
        .send(requestBody);

      // Assert the response
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "storage space not found" });
      expect(StorageSpace.findOneAndUpdate).toHaveBeenCalledTimes(1);
      expect(StorageSpace.findOneAndUpdate).toHaveBeenCalledWith(
        { id: "1" },
        requestBody,
        { new: true }
      );
      // Add more assertions as needed
    });

    it("should return 200 and update the storagespace", async () => {
      // Mock request body
      const requestBody = {
        id: "123",
      };

      // Make the request
      const response = await request(app)
        .put("/v1/storagespace/1")
        .send(requestBody);

      // Assert the response
      expect(response.status).toBe(200);
      expect(StorageSpace.findOneAndUpdate).toHaveBeenCalledTimes(1);
      expect(StorageSpace.findOneAndUpdate).toHaveBeenCalledWith(
        { id: "1" },
        requestBody,
        { new: true }
      );
      // Add more assertions as needed
    });

    it("should return 500 if an error occurs while updating the parking", async () => {
      // Mock request body
      const requestBody = {
        id: "123",
      };

      // Make the request
      const response = await request(app)
        .put("/v1/storagespace/1")
        .send(requestBody);

      // Assert the response
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Failed to update storage space" });
      expect(StorageSpace.findOneAndUpdate).toHaveBeenCalledTimes(1);
      expect(StorageSpace.findOneAndUpdate).toHaveBeenCalledWith(
        { id: "1" },
        requestBody,
        { new: true }
      );
    });
  });

  describe("POST /", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return 400 if body is null", async () => {
      // Mock request body
      const requestBody = null;

      // Make the request
      const response = await request(app)
        .post("/v1/storagespace/")
        .send(requestBody);

      // Assert the response
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "storage space data is required" });
      // Add more assertions as needed
    });

    it("should return 400 if body is {}", async () => {
      // Mock request body
      const requestBody = {};

      // Make the request
      const response = await request(app)
        .post("/v1/storagespace/")
        .send(requestBody);

      // Assert the response
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "storage space data is required" });
      // Add more assertions as needed
    });

    it("should return 500 if validation fails while creating the storagespace", async () => {
      // Mock request body
      const requestBody = {
        id: "123",
      };

      // Make the request
      const response = await request(app)
        .post("/v1/storagespace/")
        .send(requestBody);

      // Assert the response
      expect(StorageSpace.validate).toHaveBeenCalledTimes(1);
      expect(StorageSpace.validate).toHaveBeenCalledWith(requestBody);
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Failed to create storage space" });
    });

    it("should return 500 if creating the storagespace fails", async () => {
      // Mock request body
      const requestBody = {
        id: "123",
      };

      // Make the request
      const response = await request(app)
        .post("/v1/storagespace/")
        .send(requestBody);

      // Assert the response
      expect(StorageSpace.validate).toHaveBeenCalledTimes(1);
      expect(StorageSpace.validate).toHaveBeenCalledWith(requestBody);
      expect(StorageSpace.create).toHaveBeenCalledTimes(1);
      expect(StorageSpace.create).toHaveBeenCalledWith(requestBody);
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Failed to create storage space" });
    });

    it("should return 201 and create a new storagespace", async () => {
      // Mock request body
      const requestBody = {
        id: "123",
      };

      // Make the request
      const response = await request(app)
        .post("/v1/storagespace/")
        .send(requestBody);

      // Assert the response
      expect(response.status).toBe(201);
      expect(StorageSpace.validate).toHaveBeenCalledTimes(1);
      expect(StorageSpace.create).toHaveBeenCalledTimes(1);
      expect(StorageSpace.create).toHaveBeenCalledWith(requestBody);
      // Add more assertions as needed
    });
  });
});
