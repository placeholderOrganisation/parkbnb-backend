export interface GeocodeClient {
  clientName: string;
  parseInput: (input: string) => string;
  geoCode: (address: string) => Promise<any>;
  extractLatLong: (data: JSON) => extractLatLongResponse;
}

interface extractLatLongResponse {
  lat: number;
  lng: number;
}

const MapBoxGLClient: GeocodeClient = {
  clientName: "MapBoxGL",
  parseInput: (input: string): string => {
    return encodeURIComponent(input);
  },
  geoCode: (address: string): Promise<JSON> => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?country=ca&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`;
    return fetch(url)
      .then(
        async (response): Promise<JSON> => {
          return response.json().then((data: JSON) => {
            return { ...data, success: true };
          });
        }
      )
      .catch((error) => {
        console.error("Error:", error);
        return Promise.reject({ error, success: false });
      });
  },
  extractLatLong: (data: any): extractLatLongResponse => {
    const features = data["features"] as any;
    const firstFeature = features[0];
    const center = firstFeature["center"];
    const lat = parseFloat(center[1]);
    const lng = parseFloat(center[0]);
    return { lat, lng };
  },
};

const emptyClient: GeocodeClient = {
  clientName: "empty",
  parseInput: (input: string): string => {
    return input;
  },
  geoCode: (address: string): Promise<JSON> => {
    return Promise.reject({ error: "empty client" });
  },
  extractLatLong: (data: JSON): extractLatLongResponse => {
    return { lat: -1, lng: -1 };
  },
};

export const getClients = (): GeocodeClient[] => {
  return [MapBoxGLClient, emptyClient];
};
