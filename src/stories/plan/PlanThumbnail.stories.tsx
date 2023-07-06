import { Meta, StoryObj } from "@storybook/react";
import { PlanThumbnail } from "src/view/plan/PlanThumbnail";

export default {
    title: "plan/PlanThumbnail",
    component: PlanThumbnail,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PlanThumbnail>;

type Story = StoryObj<typeof PlanThumbnail>;

export const Primary: Story = {
    args: {
        imageUrls: [
            "https://picsum.photos/1000/800",
            "https://picsum.photos/1280/720",
            "https://picsum.photos/1400/600",
            "https://picsum.photos/800/1600",
        ],
    },
};

export const Single: Story = {
    args: {
        imageUrls: ["https://picsum.photos/1000/800"],
    },
};

export const Empty: Story = {
    args: {
        imageUrls: [],
    },
};
