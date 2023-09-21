import { Meta, StoryObj } from "@storybook/react";
import { PlaceReview } from "src/view/plan/PlaceReview";

export default {
    title: "plan/PlaceReview",
    component: PlaceReview,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PlaceReview>;

type Story = StoryObj<typeof PlaceReview>;

export const Primary: Story = {
    args: {
        authorName: "John Doe",
        authorUrl: "https://example.com",
        authorPhotoUrl: "https://example.com/photo.jpg",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.",
    },
};
