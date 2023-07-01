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
            "https://picsum.photos/300/400",
            "https://picsum.photos/1280/720",
            "https://picsum.photos/400/600",
            "https://picsum.photos/400/600",
        ],
    },
};

export const Empty: Story = {
    args: {
        imageUrls: [],
    },
};
