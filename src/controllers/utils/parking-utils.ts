import dayjs, { Dayjs } from "dayjs";
import * as dayjsPluginUTC from "dayjs/plugin/utc";
import { ParkingObject } from "../../models/parking-model";

dayjs.extend(dayjsPluginUTC.default);

export interface PartialParkingObject {
  _id: string;
  owner_id: string | null;
  filters: {
    security_cameras: boolean;
    full_day_access: boolean;
    ev_charging: boolean;
    handicap_accessible: boolean;
    storage_type: string;
    vehicle_type: string;
    length: number;
    width: number;
    spaces: number;
  };
  address: {
    lat: string;
    lng: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  description: string;
  price: {
    daily: number;
    monthly: number;
  };
  is_available: boolean;
  images: string[];
  listed_on: Dayjs;
  is_scraped: boolean;
  contact: string | null;
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
  listed_on?: Dayjs;
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
    _id,
    address,
    price,
    is_available,
    images,
    filters,
    description,
    listed_on,
    contact,
  } = parking;

  const is_scraped = parking.is_scraped || false;
  const owner_id = parking.owner_id || null;

  return {
    _id,
    owner_id,
    filters,
    address,
    description,
    price: {
      daily: price.daily,
      monthly: price.monthly,
    },
    is_available,
    images,
    listed_on,
    is_scraped,
    contact,
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

  if (parkingData.listed_on) {
    const formattedListedOn = dayjs(parkingData.listed_on);
    emptyParkingObject.listed_on = formattedListedOn;
  }

  return emptyParkingObject;
};

export const initializeEmptyParking = (): ParkingObject => {
  const newParkingObject: ParkingObject = {
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

  return newParkingObject;
};
