import { Place } from "src/domain/models/Place";

export const mockPlaces: { [key: string]: Place } = {
    bookStore: {
        id: "bookStore",
        googlePlaceId: "poroto_book_store",
        name: "poroto書店",
        imageUrls: [
            "https://picsum.photos/300/400",
            "https://picsum.photos/1280/720",
            "https://picsum.photos/400/600",
            "https://picsum.photos/400/600",
            "https://picsum.photos/300/400",
            "https://picsum.photos/1280/720",
            "https://picsum.photos/400/600",
        ],
        images: [
            {
                default: "https://picsum.photos/300/400",
                small: "https://picsum.photos/300/400",
                large: "https://picsum.photos/300/400",
            },
            {
                default: "https://picsum.photos/1280/720",
                small: "https://picsum.photos/1280/720",
                large: "https://picsum.photos/1280/720",
            },
            {
                default: "https://picsum.photos/400/600",
                small: "https://picsum.photos/400/600",
                large: "https://picsum.photos/400/600",
            },
            {
                default: "https://picsum.photos/400/600",
                small: "https://picsum.photos/400/600",
                large: "https://picsum.photos/400/600",
            },
            {
                default: "https://picsum.photos/300/400",
                small: "https://picsum.photos/300/400",
                large: "https://picsum.photos/300/400",
            },
            {
                default: "https://picsum.photos/1280/720",
                small: "https://picsum.photos/1280/720",
                large: "https://picsum.photos/1280/720",
            },
            {
                default: "https://picsum.photos/400/600",
                small: "https://picsum.photos/400/600",
                large: "https://picsum.photos/400/600",
            },
        ],
        estimatedStayDuration: 60,
        location: {
            latitude: 35.681616,
            longitude: 139.764954,
        },
        googlePlaceReviews: [
            {
                rating: 4.5,
                text: "とてもきれいな書店です。",
                authorName: "山田太郎",
                authorUrl: "https://example.com",
                authorPhotoUrl: "https://picsum.photos/200/300",
                timeInMilliSec: 1600000000000,
            },
            {
                rating: 3.5,
                text: "混雑しています。",
                authorName: "鈴木二郎",
                authorUrl: "https://example.com",
                authorPhotoUrl: "https://picsum.photos/200/300",
                timeInMilliSec: 1600000000000,
            },
        ],
    },
    tokyo: {
        id: "tokyo",
        googlePlaceId: "tokyo_station",
        name: "東京駅",
        imageUrls: [
            "https://picsum.photos/300/400",
            "https://picsum.photos/1280/720",
            "https://picsum.photos/400/600",
            "https://picsum.photos/400/650",
        ],
        images: [
            {
                default: "https://picsum.photos/300/400",
                small: "https://picsum.photos/300/400",
                large: "https://picsum.photos/300/400",
            },
            {
                default: "https://picsum.photos/1280/720",
                small: "https://picsum.photos/1280/720",
                large: "https://picsum.photos/1280/720",
            },
            {
                default: "https://picsum.photos/400/600",
                small: "https://picsum.photos/400/600",
                large: "https://picsum.photos/400/600",
            },
            {
                default: "https://picsum.photos/400/650",
                small: "https://picsum.photos/400/650",
                large: "https://picsum.photos/400/650",
            },
        ],
        location: {
            latitude: 35.6809591,
            longitude: 139.7673068,
        },
        estimatedStayDuration: 60,
        googlePlaceReviews: [
            {
                rating: 4.5,
                text: "とてもきれいな駅です。",
                authorName: "山田太郎",
                authorUrl: "https://example.com",
                authorPhotoUrl: "https://picsum.photos/200/300",
                timeInMilliSec: 1600000000000,
            },
            {
                rating: 3.5,
                text: "混雑しています。",
                authorName: "鈴木二郎",
                authorUrl: "https://example.com",
                authorPhotoUrl: "https://picsum.photos/200/300",
                timeInMilliSec: 1600000000000,
            },
        ],
    },
    marunouchi: {
        id: "marunouchi",
        googlePlaceId: "marunouchi_station",
        name: "東京駅丸の内駅前広場",
        imageUrls: [
            "https://picsum.photos/400/400",
            "https://picsum.photos/1280/700",
            "https://picsum.photos/400/500",
            "https://picsum.photos/450/600",
        ],
        images: [
            {
                default: "https://picsum.photos/400/400",
                small: "https://picsum.photos/400/400",
                large: "https://picsum.photos/400/400",
            },
            {
                default: "https://picsum.photos/1280/700",
                small: "https://picsum.photos/1280/700",
                large: "https://picsum.photos/1280/700",
            },
            {
                default: "https://picsum.photos/400/500",
                small: "https://picsum.photos/400/500",
                large: "https://picsum.photos/400/500",
            },
            {
                default: "https://picsum.photos/450/600",
                small: "https://picsum.photos/450/600",
                large: "https://picsum.photos/450/600",
            },
        ],
        location: {
            latitude: 35.681616,
            longitude: 139.764954,
        },
        estimatedStayDuration: 60,
    },
};
