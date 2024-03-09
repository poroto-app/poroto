import { Meta, StoryObj } from "@storybook/react";
import { mockPlaces } from "src/stories/mock/place";
import { NearbyPlaceList } from "src/view/plandetail/NearbyPlaceList";

export default {
    title: "plan_detail/NearbyPlaceList",
    component: NearbyPlaceList,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} as Meta<typeof NearbyPlaceList>;

type Story = StoryObj<typeof NearbyPlaceList>;

export const Primary: Story = {
    args: {
        places: [
            mockPlaces.bookStore,
            mockPlaces.marunouchi,
            mockPlaces.restaurant,
            mockPlaces.tokyo,
            mockPlaces.bookStore,
            mockPlaces.marunouchi,
            mockPlaces.restaurant,
            mockPlaces.tokyo,
        ],
    },
};

export const Loading: Story = {
    args: {
        places: null,
    },
};
