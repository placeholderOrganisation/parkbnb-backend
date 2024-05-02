// @ts-nocheck
import request from "supertest";
import app from "../../../src/app";
import { Parking, ParkingObject } from "../../../src/models/parking-model";

import dayjs from "dayjs";
import * as dayjsPluginUTC from "dayjs/plugin/utc";

dayjs.extend(dayjsPluginUTC.default);

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
        return expectedPartialParking1;
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
    findOneAndDelete: jest
      .fn()
      .mockImplementationOnce(() => {
        return null;
      })
      .mockImplementationOnce(() => {
        return parkingUsedForDelete;
      })
      .mockImplementationOnce(() => {
        throw new Error();
      }),
  },
}));

const parking1: ParkingObject = {
  _id: 1,
  owner_id: "1",
  filters: {
    security_cameras: true,
    full_day_access: true,
    ev_charging: true,
    handicap_accessible: true,
    storage_type: "outdoor",
    vehicle_type: "sedan / suv",
    length: 5,
    width: 3,
    spaces: 1,
  },
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
  listed_on: "2021-05-05 12:00:00",
};

const parking2: ParkingObject = {
  _id: 2,
  owner_id: "2",
  filters: {
    security_cameras: true,
    full_day_access: true,
    ev_charging: true,
    handicap_accessible: true,
    storage_type: "outdoor",
    vehicle_type: "sedan / suv",
    length: 4,
    width: 4,
    spaces: 1,
  },
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
  listed_on: "2021-05-05 12:00:00",
  length: 4,
  width: 4,
};

const parkingUsedForDelete: ParkingObject = {
  _id: 3,
  owner_id: "3",
  filters: {
    security_cameras: true,
    full_day_access: true,
    ev_charging: true,
    handicap_accessible: true,
    storage_type: "outdoor",
    vehicle_type: "sedan / suv",
    length: 5,
    width: 3,
    spaces: 1,
  },
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
  listed_on: "2021-05-05 12:00:00",
};

const expectedPartialParking1: PartialParkingObject = {
  _id: 1,
  owner_id: "1",
  filters: {
    security_cameras: true,
    full_day_access: true,
    ev_charging: true,
    handicap_accessible: true,
    storage_type: "outdoor",
    vehicle_type: "sedan / suv",
    length: 5,
    width: 3,
    spaces: 1,
  },
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
  price: { daily: 50, monthly: 500 },
  is_available: true,
  images: ["image1.jpg", "image2.jpg"],
  listed_on: "2021-05-05 12:00:00",
  is_scraped: false,
};

const expectedPartialParking2: PartialParkingObject = {
  _id: 2,
  owner_id: "2",
  filters: {
    security_cameras: true,
    full_day_access: true,
    ev_charging: true,
    handicap_accessible: true,
    storage_type: "outdoor",
    vehicle_type: "sedan / suv",
    length: 4,
    width: 4,
    spaces: 1,
  },
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
  price: { daily: 50, monthly: 1500 },
  is_available: true,
  images: ["image3.jpg", "image4.jpg"],
  listed_on: "2021-05-05 12:00:00",
  is_scraped: false,
};

const parkings = [parking1, parking2];

const expectedPartialParkings: PartialParkingObject[] = [
  expectedPartialParking1,
  expectedPartialParking2,
];

describe("Parking API", () => {
  jest.useFakeTimers().setSystemTime(new Date());

  // Mock the empty parking object here to get correct timestamps
  const emptyParkingObject = {
    owner_id: "",
    filters: {
      security_cameras: false,
      full_day_access: false,
      ev_charging: false,
      handicap_accessible: false,
      storage_type: "",
      vehicle_type: "",
      length: 0,
      width: 0,
      spaces: 0,
    },
    address: {
      lat: "",
      lng: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
    description: "",
    price: {
      daily: 0,
      monthly: 0,
    },
    is_available: false,
    images: [],
    listed_on: dayjs.utc(),
    is_scraped: false,
    contact: "",
  };

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
      expect(response.body).toEqual(expectedPartialParkings[0]);

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

  describe("DELETE /:id", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    const requestBody = {
      parking_id: "3",
      owner_id: "3",
    };

    it("should return 400 if body is null", async () => {
      // Mock request body
      const requestBody = null;

      // Make the request
      const response = await request(app)
        .delete("/v1/parking/")
        .send(requestBody);

      // Assert the response
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Parking Data is required" });
      // Add more assertions as needed
    });

    it("should return 404 if parking with given id not found", async () => {
      // Make the request
      const response = await request(app)
        .delete("/v1/parking/")
        .send(requestBody);

      // Assert the response
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Parking not found" });
      // Add more assertions as needed
    });

    it("should return 200 and delete the parking", async () => {
      // Make the request
      const response = await request(app)
        .delete("/v1/parking/")
        .send(requestBody);

      // Assert the response
      expect(response.status).toBe(200);
      expect(response.body).toEqual(parkingUsedForDelete._id);
      // Add more assertions as needed
    });

    it("should return 500 if an error occurs while deleting the parking", async () => {
      // Make the request
      const response = await request(app)
        .delete("/v1/parking/")
        .send(requestBody);

      // Assert the response
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Failed to delete parking" });
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
      expect(Parking.validate).toHaveBeenCalledWith(emptyParkingObject);
      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: "Failed to create parking",
        error: {},
      });
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
      expect(Parking.validate).toHaveBeenCalledWith(emptyParkingObject);
      expect(Parking.create).toHaveBeenCalledTimes(1);
      expect(Parking.create).toHaveBeenCalledWith(emptyParkingObject);
      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: "Failed to create parking",
        error: {},
      });
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
      expect(Parking.create).toHaveBeenCalledWith(emptyParkingObject);
      // Add more assertions as needed
    });
  });
});
