import { Meta, StoryObj } from "@storybook/react";
import { mockPlaces } from "src/stories/mock/place";
import { PlaceCard } from "src/view/place/PlaceCard";

export default {
    title: "place/PlaceCard",
    component: PlaceCard,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PlaceCard>;

type Story = StoryObj<typeof PlaceCard>;

export const Primary: Story = {
    args: {
        place: mockPlaces.bookStore,
    },
};

export const Empty: Story = {
    args: {
        place: null,
    },
};
