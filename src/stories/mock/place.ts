import { Place } from "src/domain/models/Place";
import { PlaceCategoryTypes } from "src/domain/models/PlaceCategory";

const bookStore: Place = {
    id: "bookStore",
    googlePlaceId: "poroto_book_store",
    name: "poroto書店",
    images: [
        {
            isGoogleImage: false,
            default: "https://picsum.photos/300/400",
            small: "https://picsum.photos/300/400",
            large: "https://picsum.photos/300/400",
        },
        {
            isGoogleImage: false,
            default: "https://picsum.photos/1280/720",
            small: "https://picsum.photos/1280/720",
            large: "https://picsum.photos/1280/720",
        },
        {
            isGoogleImage: false,
            default: "https://picsum.photos/400/600",
            small: "https://picsum.photos/400/600",
            large: "https://picsum.photos/400/600",
        },
        {
            isGoogleImage: false,
            default: "https://picsum.photos/400/600",
            small: "https://picsum.photos/400/600",
            large: "https://picsum.photos/400/600",
        },
        {
            isGoogleImage: false,
            default: "https://picsum.photos/300/400",
            small: "https://picsum.photos/300/400",
            large: "https://picsum.photos/300/400",
        },
        {
            isGoogleImage: false,
            default: "https://picsum.photos/1280/720",
            small: "https://picsum.photos/1280/720",
            large: "https://picsum.photos/1280/720",
        },
        {
            isGoogleImage: false,
            default: "https://picsum.photos/400/600",
            small: "https://picsum.photos/400/600",
            large: "https://picsum.photos/400/600",
        },
    ],
    estimatedStayDuration: 60,
    priceRange: {
        min: 1000,
        max: 2000,
        googlePriceLevel: 2,
    },
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
    categories: [{ id: PlaceCategoryTypes.BookStores, displayName: "本屋" }],
};

const tokyo: Place = {
    id: "tokyo",
    googlePlaceId: "tokyo_station",
    name: "東京駅",
    images: [
        {
            isGoogleImage: false,
            default: "https://picsum.photos/1280/720",
            small: "https://picsum.photos/1280/720",
            large: "https://picsum.photos/1280/720",
        },
        {
            isGoogleImage: false,
            default: "https://picsum.photos/400/600",
            small: "https://picsum.photos/400/600",
            large: "https://picsum.photos/400/600",
        },
        {
            isGoogleImage: false,
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
    categories: [],
};

const marunouchi: Place = {
    id: "marunouchi",
    googlePlaceId: "marunouchi_station",
    name: "東京駅丸の内駅前広場",
    images: [
        {
            isGoogleImage: false,
            default: "https://picsum.photos/400/400",
            small: "https://picsum.photos/400/400",
            large: "https://picsum.photos/400/400",
        },
        {
            isGoogleImage: false,
            default: "https://picsum.photos/1280/700",
            small: "https://picsum.photos/1280/700",
            large: "https://picsum.photos/1280/700",
        },
        {
            isGoogleImage: false,
            default: "https://picsum.photos/400/500",
            small: "https://picsum.photos/400/500",
            large: "https://picsum.photos/400/500",
        },
        {
            isGoogleImage: false,
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
    categories: [{ id: PlaceCategoryTypes.Park, displayName: "公園" }],
};

export const mockPlaces = {
    bookStore,
    tokyo,
    marunouchi,
};
