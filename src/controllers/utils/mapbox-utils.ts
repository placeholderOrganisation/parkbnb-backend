// going to call internal mapbox api using mapbox-client.ts
import { GeocodeClient, getClients } from "../../clients/mapbox-client";

interface GeocodeClientResponse {
  clientName: string;
  success: boolean;
  lat?: number;
  lng?: number;
  error?: JSON;
}

export interface GeocodeUtilFunctionResponse {
  lat: number;
  lng: number;
}

const clients: GeocodeClient[] = getClients();

export const geocode = (input: string): GeocodeUtilFunctionResponse => {
  const geocodeClientResponsePromises: Promise<
    GeocodeClientResponse
  >[] = clients.map((client: GeocodeClient) => {
    const parsedInput = client.parseInput(input);

    return client
      .geoCode(parsedInput)
      .then((response) => {
        if (response.success) {
          const { lat, lng } = client.extractLatLong(response);
          return { lat, lng, clientName: client.clientName, success: true };
        }
        return {
          clientName: client.clientName,
          success: false,
        };
      })
      .catch((error) => {
        console.error(error);
        return { ...error, clientName: client.clientName, success: false };
      });
  });

  // This block is responsible for sending the actual results from this function
  // Atleast one of the provider sshould send a success response
  // @ts-ignore
  return Promise.all(geocodeClientResponsePromises).then((responses) => {
    const successResponse = responses.find(
      (response) => response.success === true
    );
    if (successResponse) {
      return {
        lat: successResponse.lat,
        lng: successResponse.lng,
      };
    }
    return { lat: -1, lng: -1 };
  });
};
