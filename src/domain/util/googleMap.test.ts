import { describe } from "@jest/globals";
import { GeoLocation } from "src/domain/models/GeoLocation";
import { generateGoogleMapUrl } from "src/domain/util/googleMap";

describe("generateGoogleMapUrl", () => {
    const cases: {
        name: string;
        locations: GeoLocation[];
        startLocation?: GeoLocation;
        expected: string;
    }[] = [
        {
            name: "1 destination",
            locations: [
                // 東京駅
                {
                    latitude: 35.680959106959,
                    longitude: 139.76730676352,
                },
            ],
            expected: encodeURI(
                "https://www.google.com/maps/dir/?api=1&destination=35.680959106959,139.76730676352"
            ),
        },
        {
            name: "1 origin and 1 destination",
            locations: [
                // 横浜駅
                {
                    latitude: 35.46606942124,
                    longitude: 139.62261961841,
                },
            ],
            // 東京駅
            startLocation: {
                latitude: 35.680959106959,
                longitude: 139.76730676352,
            },
            expected: encodeURI(
                "https://www.google.com/maps/dir/?api=1&origin=35.680959106959,139.76730676352&destination=35.46606942124,139.62261961841"
            ),
        },
        {
            name: "1 waypoints and 1 destination",
            locations: [
                // 東京駅
                {
                    latitude: 35.680959106959,
                    longitude: 139.76730676352,
                },
                // 横浜駅
                {
                    latitude: 35.46606942124,
                    longitude: 139.62261961841,
                },
            ],
            expected: encodeURI(
                "https://www.google.com/maps/dir/?api=1&waypoints=35.680959106959,139.76730676352&destination=35.46606942124,139.62261961841"
            ),
        },
        {
            name: "2 waypoints and 1 destination",
            locations: [
                // 東京駅
                {
                    latitude: 35.680959106959,
                    longitude: 139.76730676352,
                },
                // 川崎駅
                {
                    latitude: 35.532983983087,
                    longitude: 139.70099031194,
                },
                // 横浜駅
                {
                    latitude: 35.46606942124,
                    longitude: 139.62261961841,
                },
            ],
            expected: encodeURI(
                "https://www.google.com/maps/dir/?api=1&waypoints=35.680959106959,139.76730676352|35.532983983087,139.70099031194&destination=35.46606942124,139.62261961841"
            ),
        },
    ];

    cases.map((c) => {
        test(c.name, () => {
            const actual = generateGoogleMapUrl({
                locations: c.locations,
                startLocation: c.startLocation,
            });
            expect(actual).toEqual(c.expected);
        });
    });
});
