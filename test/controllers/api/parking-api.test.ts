// @ts-nocheck
// @ts-nocheck
import request from "supertest";
import app from "../../../src/app";
import { Parking } from "../../../src/models/parking-model";

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
        return parking1;
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
  },
}));

const parking1: ParkingObject = {
  parking_id: 1,
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
  description: "parking spot in the back",
  price: { hourly: 5, daily: 50, monthly: 500, yearly: 5000 },
  is_available: true,
  images: ["image1.jpg", "image2.jpg"],
  created_at: "2021-05-05 12:00:00",
  length: 5,
  width: 3,
};

const parking2: ParkingObject = {
  parking_id: 2,
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
  description: "parking spot in the back",
  price: { hourly: 5, daily: 50, monthly: 1500, yearly: 5000 },
  is_available: true,
  images: ["image3.jpg", "image4.jpg"],
  created_at: "2021-05-05 12:00:00",
  length: 4,
  width: 4,
};

const expectedPartialParking1: PartialParkingObject = {
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

const expectedPartialParking2: PartialParkingObject = {
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

const parkings = [parking1, parking2];

const expectedPartialParkings: PartialParkingObject[] = [
  expectedPartialParking1,
  expectedPartialParking2,
];

describe("Parking API", () => {
  describe("GET /", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return 200 and return partial parkings", async () => {
      // Make the request
      const response = await request(app).get("/v1/parking/");

      // Assert the response
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedPartialParkings);
      // Add more assertions as needed
    });

    it("should return 500 if an error occurs", async () => {
      // Make the request
      const response = await request(app).get("/v1/parking/");

      // Assert the response
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Failed to get parkings" });
      // Add more assertions as needed
    });
  });

  describe("GET /:id", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return 404 if parking with given id not found", async () => {
      // Make the request
      const response = await request(app).get("/v1/parking/123");

      // Assert the response
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Parking not found" });
      // Add more assertions as needed
    });

    it("should return 200 and return full parking", async () => {
      // Make the request
      const response = await request(app).get("/v1/parking/123");

      // Assert the response
      expect(response.status).toBe(200);
      expect(response.body).toEqual(parkings[0]);

      // Add more assertions as needed
    });

    it("should return 500 if an error occurs", async () => {
      // Make the request
      const response = await request(app).get("/v1/parking/123");

      // Assert the response
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Failed to get parking" });
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
        .put("/v1/parking/1")
        .send(requestBody);

      // Assert the response
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Parking data is required" });
      // Add more assertions as needed
    });

    it("should return 400 if body is {}", async () => {
      // Mock request body
      const requestBody = {};

      // Make the request
      const response = await request(app)
        .put("/v1/parking/1")
        .send(requestBody);

      // Assert the response
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Parking data is required" });
      // Add more assertions as needed
    });

    it("should return 404 if parking with given id not found", async () => {
      // Mock request body
      const requestBody = {
        id: "123",
      };

      // Make the request
      const response = await request(app)
        .put("/v1/parking/1")
        .send(requestBody);

      // Assert the response
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Parking not found" });
      expect(Parking.findOneAndUpdate).toHaveBeenCalledTimes(1);
      expect(Parking.findOneAndUpdate).toHaveBeenCalledWith(
        { id: "1" },
        requestBody,
        { new: true }
      );
      // Add more assertions as needed
    });

    it("should return 200 and update the parking", async () => {
      // Mock request body
      const requestBody = {
        id: "123",
      };

      // Make the request
      const response = await request(app)
        .put("/v1/parking/1")
        .send(requestBody);

      // Assert the response
      expect(response.status).toBe(200);
      expect(Parking.findOneAndUpdate).toHaveBeenCalledTimes(1);
      expect(Parking.findOneAndUpdate).toHaveBeenCalledWith(
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
        .put("/v1/parking/1")
        .send(requestBody);

      // Assert the response
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Failed to update parking" });
      expect(Parking.findOneAndUpdate).toHaveBeenCalledTimes(1);
      expect(Parking.findOneAndUpdate).toHaveBeenCalledWith(
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
        .post("/v1/parking/")
        .send(requestBody);

      // Assert the response
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Parking data is required" });
      // Add more assertions as needed
    });

    it("should return 400 if body is {}", async () => {
      // Mock request body
      const requestBody = {};

      // Make the request
      const response = await request(app)
        .post("/v1/parking/")
        .send(requestBody);

      // Assert the response
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Parking data is required" });
      // Add more assertions as needed
    });

    it("should return 500 if validation fails while creating the parking", async () => {
      // Mock request body
      const requestBody = {
        id: "123",
      };

      // Make the request
      const response = await request(app)
        .post("/v1/parking/")
        .send(requestBody);

      // Assert the response
      expect(Parking.validate).toHaveBeenCalledTimes(1);
      expect(Parking.validate).toHaveBeenCalledWith(requestBody);
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Failed to create parking" });
    });

    it("should return 500 if creating the parking fails", async () => {
      // Mock request body
      const requestBody = {
        id: "123",
      };

      // Make the request
      const response = await request(app)
        .post("/v1/parking/")
        .send(requestBody);

      // Assert the response
      expect(Parking.validate).toHaveBeenCalledTimes(1);
      expect(Parking.validate).toHaveBeenCalledWith(requestBody);
      expect(Parking.create).toHaveBeenCalledTimes(1);
      expect(Parking.create).toHaveBeenCalledWith(requestBody);
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Failed to create parking" });
    });

    it("should return 201 and create a new parking", async () => {
      // Mock request body
      const requestBody = {
        id: "123",
      };

      // Make the request
      const response = await request(app)
        .post("/v1/parking/")
        .send(requestBody);

      // Assert the response
      expect(response.status).toBe(201);
      expect(Parking.validate).toHaveBeenCalledTimes(1);
      expect(Parking.create).toHaveBeenCalledTimes(1);
      expect(Parking.create).toHaveBeenCalledWith(requestBody);
      // Add more assertions as needed
    });
  });
});
