import { Meta, StoryObj } from "@storybook/react";
import { mockPlaces } from "src/stories/mock/place";
import { PlacePreview } from "src/view/plan/PlacePreview";

export default {
    title: "plan/PlacePreview",
    component: PlacePreview,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PlacePreview>;

type Story = StoryObj<typeof PlacePreview>;

export const Primary: Story = {
    args: {
        name: mockPlaces.bookStore.name,
        images: mockPlaces.bookStore.images,
        googlePlaceReviews: mockPlaces.bookStore.googlePlaceReviews,
    },
};

export const Loading: Story = {
    args: {
        name: mockPlaces.bookStore.name,
        images: [
            "https://example.com/photo/a",
            "https://example.com/photo/b",
            "https://example.com/photo/c",
            "https://example.com/photo/d",
        ].map((url) => ({
            default: url,
            small: url,
            large: url,
        })),
    },
};

export const EmptyImages: Story = {
    args: {
        name: mockPlaces.bookStore.name,
        images: [],
    },
};

export const EmptyTags: Story = {
    args: {
        name: mockPlaces.bookStore.name,
        images: mockPlaces.bookStore.images,
    },
};
