import { describe } from "@jest/globals";
import { GeoLocation } from "src/domain/models/GeoLocation";
import {
    generateGoogleMapUrl,
    GoogleMapPlaceParam,
} from "src/domain/util/googleMap";

describe("generateGoogleMapUrl", () => {
    const cases: {
        name: string;
        places: GoogleMapPlaceParam[];
        startLocation?: GeoLocation;
        expected: string;
    }[] = [
        {
            name: "1 destination",
            places: [
                {
                    name: "東京駅",
                    googlePlaceId: "ChIJC3Cf2PuLGGAROO00ukl8JwA",
                    location: {
                        latitude: 35.680959106959,
                        longitude: 139.76730676352,
                    },
                },
            ],
            expected: encodeURI(
                "https://www.google.com/maps/dir/?api=1&destination=東京駅&destination_place_id=ChIJC3Cf2PuLGGAROO00ukl8JwA"
            ),
        },
        {
            name: "1 destination without googlePlaceId",
            places: [
                {
                    name: "東京駅",
                    location: {
                        latitude: 35.680959106959,
                        longitude: 139.76730676352,
                    },
                },
            ],
            expected: encodeURI(
                "https://www.google.com/maps/dir/?api=1&destination=35.680959106959,139.76730676352"
            ),
        },
        {
            name: "1 origin and 1 destination",
            places: [
                {
                    name: "横浜駅",
                    googlePlaceId: "ChIJLcYndBvMGGARoZMkzgJdBus",
                    location: {
                        latitude: 35.46606942124,
                        longitude: 139.62261961841,
                    },
                },
            ],
            // 東京駅
            startLocation: {
                latitude: 35.680959106959,
                longitude: 139.76730676352,
            },
            expected: encodeURI(
                "https://www.google.com/maps/dir/?api=1&origin=35.680959106959,139.76730676352&destination=横浜駅&destination_place_id=ChIJLcYndBvMGGARoZMkzgJdBus"
            ),
        },
        {
            name: "1 waypoints and 1 destination",
            places: [
                {
                    name: "東京駅",
                    googlePlaceId: "ChIJC3Cf2PuLGGAROO00ukl8JwA",
                    location: {
                        latitude: 35.680959106959,
                        longitude: 139.76730676352,
                    },
                },
                {
                    name: "横浜駅",
                    googlePlaceId: "ChIJLcYndBvMGGARoZMkzgJdBus",
                    location: {
                        latitude: 35.46606942124,
                        longitude: 139.62261961841,
                    },
                },
            ],
            expected: encodeURI(
                "https://www.google.com/maps/dir/?api=1&waypoints=東京駅&waypoint_place_ids=ChIJC3Cf2PuLGGAROO00ukl8JwA&destination=横浜駅&destination_place_id=ChIJLcYndBvMGGARoZMkzgJdBus"
            ),
        },
        {
            name: "2 waypoints and 1 destination",
            places: [
                {
                    name: "東京駅",
                    googlePlaceId: "ChIJC3Cf2PuLGGAROO00ukl8JwA",
                    location: {
                        latitude: 35.680959106959,
                        longitude: 139.76730676352,
                    },
                },
                {
                    name: "川崎駅",
                    googlePlaceId: "ChIJx6xjJY7IGGARoZMkzgJdBus",
                    location: {
                        latitude: 35.532983983087,
                        longitude: 139.70099031194,
                    },
                },
                {
                    name: "横浜駅",
                    googlePlaceId: "ChIJLcYndBvMGGARoZMkzgJdBus",
                    location: {
                        latitude: 35.46606942124,
                        longitude: 139.62261961841,
                    },
                },
            ],
            expected: encodeURI(
                "https://www.google.com/maps/dir/?api=1&waypoints=東京駅|川崎駅&waypoint_place_ids=ChIJC3Cf2PuLGGAROO00ukl8JwA|ChIJx6xjJY7IGGARoZMkzgJdBus&destination=横浜駅&destination_place_id=ChIJLcYndBvMGGARoZMkzgJdBus"
            ),
        },
    ];

    cases.map((c) => {
        test(c.name, () => {
            const actual = generateGoogleMapUrl({
                places: c.places,
                startLocation: c.startLocation,
            });
            expect(actual).toEqual(c.expected);
        });
    });
});
