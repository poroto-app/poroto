import { Plan } from "src/domain/models/Plan";

export const mockPlan: Plan = {
    id: "1",
    title: "カフェでほっと一息",
    timeInMinutes: 60,
    tags: [],
    places: [
        {
            name: "東京駅",
            imageUrls: [],
            tags: [],
            location: {
                latitude: 35.6809591,
                longitude: 139.7673068,
            },
        },
        {
            name: "東京駅丸の内駅前広場",
            imageUrls: [],
            tags: [],
            location: {
                latitude: 35.681616,
                longitude: 139.764954,
            },
        },
    ],
};
