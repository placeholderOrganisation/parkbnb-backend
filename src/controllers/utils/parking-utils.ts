import { ParkingObject } from "../../models/parking-model";

export interface PartialParkingObject {
  owner_id?: string;
  address?: {
    city?: string;
  };
  price?: {
    monthly?: number;
  };
  is_available?: boolean;
  images?: string[];
  length?: number;
  width?: number;
}

export const getPartialParkings = (
  parkings: ParkingObject[]
): PartialParkingObject[] => {
  return parkings.map((parking) => {
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
  });
};
