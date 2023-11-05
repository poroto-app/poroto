import { Meta, StoryObj } from "@storybook/react";
import { mockPlaces } from "src/stories/mock/place";
import { PlaceInfoTab } from "src/view/plandetail/PlaceInfoTab";

export default {
    title: "plan_detail/PlaceInfoTab",
    component: PlaceInfoTab,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PlaceInfoTab>;

type Story = StoryObj<typeof PlaceInfoTab>;

export const Primary: Story = {
    args: {
        place: mockPlaces.bookStore,
    },
};

export const WoCategory: Story = {
    args: {
        place: {
            ...mockPlaces.bookStore,
            categories: [],
        },
    },
};

export const WoPriceRange: Story = {
    args: {
        place: {
            ...mockPlaces.bookStore,
            priceRange: null,
        },
    },
};
