import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { mockPlaces } from "src/stories/mock/place";
import { ReorderablePlaceList } from "src/view/plancandidate/ReorderablePlaceList";

export default {
    title: "plan_candidate/ReorderablePlaceList",
    component: ReorderablePlaceList,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof ReorderablePlaceList>;

type Story = StoryObj<typeof ReorderablePlaceList>;

export const Primary: Story = {
    args: {
        places: [
            mockPlaces.restaurant,
            mockPlaces.tokyo,
            mockPlaces.marunouchi,
            mockPlaces.bookStore,
        ],
        transitions: [
            {
                fromPlaceId: mockPlaces.restaurant.id,
                toPlaceId: mockPlaces.tokyo.id,
                durationInMinutes: 20,
            },
            {
                fromPlaceId: mockPlaces.tokyo.id,
                toPlaceId: mockPlaces.marunouchi.id,
                durationInMinutes: 20,
            },
            {
                fromPlaceId: mockPlaces.marunouchi.id,
                toPlaceId: mockPlaces.bookStore.id,
                durationInMinutes: 20,
            },
        ],
    },
    render: (props) => {
        const [place, setPlace] = useState(props.places);
        return (
            <ReorderablePlaceList
                places={place}
                transitions={props.transitions}
                onReorderPlaces={(places) => setPlace(places)}
            />
        );
    },
};
