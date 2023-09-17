import { Plan } from "src/domain/models/Plan";
import { mockPlaces } from "src/stories/mock/place";

export const mockPlan: Plan = {
    id: "1",
    title: "カフェでほっと一息",
    timeInMinutes: 60,
    tags: [],
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
