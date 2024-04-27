"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClients = void 0;
const MapBoxGLClient = {
    clientName: "MapBoxGL",
    parseInput: (input) => {
        return encodeURIComponent(input);
    },
    geoCode: (address) => {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?country=ca&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`;
        return fetch(url)
            .then((response) => __awaiter(void 0, void 0, void 0, function* () {
            return response.json().then((data) => {
                return Object.assign(Object.assign({}, data), { success: true });
            });
        }))
            .catch((error) => {
            console.error("Error:", error);
            return Promise.reject({ error, success: false });
        });
    },
    extractLatLong: (data) => {
        const features = data["features"];
        const firstFeature = features[0];
        const center = firstFeature["center"];
        const lat = parseFloat(center[1]);
        const lng = parseFloat(center[0]);
        return { lat, lng };
    },
};
const emptyClient = {
    clientName: "empty",
    parseInput: (input) => {
        return input;
    },
    geoCode: (address) => {
        return Promise.reject({ error: "empty client" });
    },
    extractLatLong: (data) => {
        return { lat: -1, lng: -1 };
    },
};
const getClients = () => {
    return [MapBoxGLClient, emptyClient];
};
exports.getClients = getClients;
//# sourceMappingURL=geocode-client.js.map