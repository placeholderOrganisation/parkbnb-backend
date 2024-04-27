import { StorageSpaceObject } from "../../models/storagespace-model";
import dayjs, { Dayjs } from "dayjs";
import * as dayjsPluginUTC from "dayjs/plugin/utc";

dayjs.extend(dayjsPluginUTC.default);

export interface PartialStorageSpaceObject {
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

export interface RequestStorageSpaceObject {
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

export const getPartialStorageSpaces = (
  storagespaces: StorageSpaceObject[]
): PartialStorageSpaceObject[] => {
  return storagespaces.map((storagespace) => {
    return getPartialStorageSpaceObject(storagespace);
  });
};

export const getPartialStorageSpaceObject = (
  storagespace: StorageSpaceObject
): PartialStorageSpaceObject => {
  const {
    owner_id,
    address,
    price,
    is_available,
    images,
    length,
    width,
  } = storagespace;
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

export const initializeEmptyStorageSpace = (): StorageSpaceObject => {
  const newStorageSpaceObject: StorageSpaceObject = {
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
    listed_on: dayjs.utc(),
    length: 0,
    width: 0,
  };

  return newStorageSpaceObject;
};
