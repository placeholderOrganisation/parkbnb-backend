// @ts-nocheck
import {
  getPartialParkings,
  PartialParkingObject,
  initializeEmptyParking,
} from "../../../src/controllers/utils/parking-utils";
import { ParkingObject } from "../../../src/models/parking-model";

describe("getPartialParkings", () => {
  it("should return an array of partial parking objects", () => {
    const parking1 = {
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

    const parking2 = {
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
      is_available: false,
      images: ["image3.jpg", "image4.jpg"],
      created_at: "2021-05-05 12:00:00",
      length: 4,
      width: 4,
    };

    const parkings: ParkingObject[] = [parking1, parking2];

    const expectedPartialParkings: PartialParkingObject[] = [
      {
        owner_id: "1",
        address: {
          city: "New York",
        },
        price: {
          monthly: 500,
        },
        is_available: true,
        images: ["image1.jpg", "image2.jpg"],
        length: 5,
        width: 3,
      },
      {
        owner_id: "2",
        address: {
          city: "San Francisco",
        },
        price: {
          monthly: 1500,
        },
        is_available: false,
        images: ["image3.jpg", "image4.jpg"],
        length: 4,
        width: 4,
      },
    ];

    const result = getPartialParkings(parkings);

    expect(result).toEqual(expectedPartialParkings);
  });
});

describe("initializeEmptyParking", () => {
  it("should return an empty parking object", () => {
    const expectedEmptyParking = {
      owner_id: "",
      address: {
        street: "",
        city: "",
        state: "",
        zip: "",
      },
      description: "",
      price: {
        daily: 0,
        monthly: 0,
      },
      is_available: false,
      images: [],
      created_at: "",
      length: 0,
      width: 0,
    };

    const result = initializeEmptyParking();

    expect(result).toEqual(expectedEmptyParking);
  });
});
