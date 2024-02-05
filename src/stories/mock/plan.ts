import { Plan } from "src/domain/models/Plan";
import { mockPlaces } from "src/stories/mock/place";

export const mockPlan: Plan = {
    id: "1",
    title: "カフェでほっと一息",
    timeInMinutes: 60,
    transitions: [
        {
            toPlaceId: mockPlaces.tokyo.id,
            durationInMinutes: 10,
        },
        {
            fromPlaceId: mockPlaces.tokyo.id,
            toPlaceId: mockPlaces.marunouchi.id,
            durationInMinutes: 10,
        },
        {
            fromPlaceId: mockPlaces.marunouchi.id,
            toPlaceId: mockPlaces.bookStore.id,
            durationInMinutes: 10,
        },
        {
            fromPlaceId: mockPlaces.bookStore.id,
            toPlaceId: mockPlaces.restaurant.id,
            durationInMinutes: 10,
        },
    ],
    places: [
        mockPlaces.tokyo,
        mockPlaces.marunouchi,
        mockPlaces.bookStore,
        mockPlaces.restaurant,
    ],
    author: {
        id: "1",
        name: "Taro Yamada",
        avatarImage: "https://placehold.jp/150x150.png",
    },
};

const mockPlanBookStore: Plan = {
    id: "bookStore",
    title: "本屋さんでゆっくり",
    timeInMinutes: 60,
    places: [mockPlaces.bookStore, mockPlaces.marunouchi],
    transitions: [],
    author: null,
};

const mockPlanTokyo: Plan = {
    id: "tokyo",
    title: "東京観光",
    timeInMinutes: 60,
    places: [mockPlaces.tokyo, mockPlaces.marunouchi],
    transitions: [],
    author: null,
};

export const mockPlans = {
    cafe: mockPlan,
    bookStore: mockPlanBookStore,
    tokyo: mockPlanTokyo,
};
