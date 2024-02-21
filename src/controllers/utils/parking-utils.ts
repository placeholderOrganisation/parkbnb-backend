import { ParkingObject } from "../../models/parking-model";

export interface PartialParkingObject {
  owner_id: string;
  address: {
    city: string;
  };
  price: {
    monthly: number;
  };
  is_available: boolean;
  images: string[];
  length: number;
  width: number;
}

export interface RequestParkingObject {
  owner_id?: string;
  address?: {
    street?: string;
    lng?: string;
    lat?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  description?: string;
  price?: {
    hourly?: number;
    daily?: number;
    monthly?: number;
    yearly?: number;
  };
  is_available?: boolean;
  images?: string[];
  created_at?: string;
  length?: number;
  width?: number;
}

export const getPartialParkings = (
  parkings: ParkingObject[]
): PartialParkingObject[] => {
  return parkings.map((parking) => {
    return getPartialParkingObject(parking);
  });
};

export const getPartialParkingObject = (
  parking: ParkingObject
): PartialParkingObject => {
  const {
    owner_id,
    address,
    price,
    is_available,
    images,
    length,
    width,
  } = parking;
  return {
    owner_id,
    address: {
      city: address.city,
    },
    price: {
      monthly: price.monthly,
    },
    is_available,
    images,
    length,
    width,
  };
};

export const initializeEmptyParking = (): ParkingObject => {
  const newParkingObject: ParkingObject = {
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
    created_at: "",
    length: 0,
    width: 0,
  };

  return newParkingObject;
};
