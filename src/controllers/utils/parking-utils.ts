import dayjs from "dayjs";
import * as dayjsPluginUTC from "dayjs/plugin/utc";
import { ParkingObject } from "../../models/parking-model";

dayjs.extend(dayjsPluginUTC.default);

export interface PartialParkingObject {
  owner_id: string;
  address: {
    lat: string;
    lng: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
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
  listed_on?: string;
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
  const { owner_id, address, price, is_available, images, filters } = parking;
  const { length, width } = filters;
  return {
    owner_id,
    address: {
      lat: address.lat,
      lng: address.lng,
      street: address.street,
      city: address.city,
      state: address.state,
      zip: address.zip,
      country: address.country,
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

export const assembleNewParkingBody = (parkingData: any): ParkingObject => {
  const emptyParkingObject: ParkingObject = initializeEmptyParking();

  if (parkingData.owner_id) {
    emptyParkingObject.owner_id = parkingData.owner_id;
  }

  if (parkingData.filters) {
    emptyParkingObject.filters = parkingData.filters;
  }

  if (parkingData.address) {
    emptyParkingObject.address = parkingData.address;
  }

  if (parkingData.description) {
    emptyParkingObject.description = parkingData.description;
  }

  if (parkingData.price) {
    emptyParkingObject.price = parkingData.price;
  }

  if (parkingData.is_available) {
    emptyParkingObject.is_available = parkingData.is_available;
  }

  if (parkingData.images) {
    emptyParkingObject.images = parkingData.images;
  }

  if (parkingData.is_scraped) {
    emptyParkingObject.is_scraped = parkingData.is_scraped;
  }

  if (parkingData.contact) {
    emptyParkingObject.contact = parkingData.contact;
  }

  return emptyParkingObject;
};

export const initializeEmptyParking = (): ParkingObject => {
  const newParkingObject: ParkingObject = {
    owner_id: "",
    filters: {
      security_cameras: false,
      ALL_DAY_ACCESS: false,
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

  return newParkingObject;
};
