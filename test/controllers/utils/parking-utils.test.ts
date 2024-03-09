// @ts-nocheck
import {
  getPartialParkings,
  PartialParkingObject,
  initializeEmptyParking,
  getPartialParkingObject,
} from "../../../src/controllers/utils/parking-utils";
import { ParkingObject } from "../../../src/models/parking-model";

const parking1 = {
  parking_id: 1,
  owner_id: "1",
  filters: {
    security_cameras: true,
    "24/7 access": true,
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

const parking2 = {
  parking_id: 2,
  owner_id: "2",
  filters: {
    security_cameras: true,
    "24/7 access": true,
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

const parkings: ParkingObject[] = [parking1, parking2];

const expectedPartialParkings: PartialParkingObject[] = [
  expectedPartialParking1,
  expectedPartialParking2,
];

const expectedEmptyParking = {
  owner_id: "",
  filters: {
    security_cameras: false,
    "24/7 access": false,
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
  listed_on: "",
  is_scraped: false,
  contact: "",
};

describe("getPartialParkingObject", () => {
  it("should return a partial parking objects", () => {
    const result: PartialParkingObject = getPartialParkingObject(parking1);

    expect(result).toEqual(expectedPartialParking1);
  });
});

describe("getPartialParkings", () => {
  it("should return an array of partial parking objects", () => {
    const result = getPartialParkings(parkings);

    expect(result).toEqual(expectedPartialParkings);
  });
});

describe("initializeEmptyParking", () => {
  it("should return an empty parking object", () => {
    const result = initializeEmptyParking();

    expect(result).toEqual(expectedEmptyParking);
  });
});
