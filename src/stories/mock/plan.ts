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
    ],
    places: [mockPlaces.tokyo, mockPlaces.marunouchi],
    author: null,
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
