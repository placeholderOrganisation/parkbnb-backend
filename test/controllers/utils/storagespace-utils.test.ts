// @ts-nocheck
import {
  PartialStorageSpaceObject,
  initializeEmptyStorageSpace,
  getPartialStorageSpaces,
  getPartialStorageSpaceObject,
} from "../../../src/controllers/utils/storagespace-utils";
import { StorageSpaceObject } from "../../../src/models/storagespace-model";

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
  listed_on: "2021-05-05 12:00:00",
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
  listed_on: "2021-05-05 12:00:00",
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

describe("getPartialStorageSpaceObject", () => {
  it("should return a partial storage space objects", () => {
    const result: PartialStorageSpaceObject = getPartialStorageSpaceObject(
      storageSpace1
    );

    expect(result).toEqual(expectedPartialStorageSpace1);
  });
});

describe("getPartialStorageSpaces", () => {
  it("should return an array of partial storage space objects", () => {
    const result = getPartialStorageSpaces(storagespaces);

    expect(result).toEqual(expectedPartialStorageSpaces);
  });
});

describe("initializeEmptyStorageSpace", () => {
  it("should return an empty storage space object", () => {
    const expectedEmptyStorageSpace = {
      owner_id: "",
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
      length: 0,
      width: 0,
    };

    const result = initializeEmptyStorageSpace();

    expect(result).toEqual(expectedEmptyStorageSpace);
  });
});
