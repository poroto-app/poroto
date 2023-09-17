import { Plan } from "src/domain/models/Plan";

export const mockPlan: Plan = {
    id: "1",
    title: "カフェでほっと一息",
    timeInMinutes: 60,
    tags: [],
    transitions: [
        {
            toPlaceId: "1",
            durationInMinutes: 10,
        },
        {
            fromPlaceId: "1",
            toPlaceId: "2",
            durationInMinutes: 10,
        },
    ],
    places: [
        {
            id: "1",
            googlePlaceId: "1",
            name: "東京駅",
            imageUrls: [
                "https://picsum.photos/300/400",
                "https://picsum.photos/1280/720",
                "https://picsum.photos/400/600",
                "https://picsum.photos/400/650",
            ],
            thumbnailUrls: [
                "https://picsum.photos/300/400",
                "https://picsum.photos/1280/720",
                "https://picsum.photos/400/600",
                "https://picsum.photos/400/650",
            ],
            tags: [],
            location: {
                latitude: 35.6809591,
                longitude: 139.7673068,
            },
            estimatedStayDuration: 60,
        },
        {
            id: "2",
            googlePlaceId: "2",
            name: "東京駅丸の内駅前広場",
            imageUrls: [
                "https://picsum.photos/400/400",
                "https://picsum.photos/1280/700",
                "https://picsum.photos/400/500",
                "https://picsum.photos/450/600",
            ],
            thumbnailUrls: [
                "https://picsum.photos/400/400",
                "https://picsum.photos/1280/700",
                "https://picsum.photos/400/500",
                "https://picsum.photos/450/600",
            ],
            tags: [],
            location: {
                latitude: 35.681616,
                longitude: 139.764954,
            },
            estimatedStayDuration: 60,
        },
    ],
    author: null,
};
