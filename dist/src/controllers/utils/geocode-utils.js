"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geocode = void 0;
// going to call internal mapbox api using mapbox-client.ts
const geocode_client_1 = require("../../clients/geocode-client");
const clients = (0, geocode_client_1.getClients)();
// TODO: Add tests for this function
const geocode = (input) => {
    const geocodeClientResponsePromises = clients.map((client) => {
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
            return Object.assign(Object.assign({}, error), { clientName: client.clientName, success: false });
        });
    });
    // This block is responsible for sending the actual results from this function
    // Atleast one of the provider should send a success response
    // @ts-ignore
    return Promise.all(geocodeClientResponsePromises).then((responses) => {
        const successResponse = responses.find((response) => response.success === true);
        if (successResponse) {
            return {
                lat: successResponse.lat,
                lng: successResponse.lng,
                success: true,
            };
        }
        return { lat: -1, lng: -1, success: false };
    });
};
exports.geocode = geocode;
//# sourceMappingURL=geocode-utils.js.map