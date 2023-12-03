import { Meta, StoryObj } from "@storybook/react";
import { Image } from "src/domain/models/Image";
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
        images: [
            "https://picsum.photos/1000/800",
            "https://picsum.photos/1280/720",
            "https://picsum.photos/1400/600",
            "https://picsum.photos/800/1600",
        ].map(
            (url, i): Image => ({
                isGoogleImage: i % 2 === 0,
                default: url,
                small: url,
                large: url,
            })
        ),
    },
};

export const Single: Story = {
    args: {
        images: ["https://picsum.photos/1000/800"].map((url) => ({
            isGoogleImage: false,
            default: url,
            small: url,
            large: url,
        })),
    },
};

export const Empty: Story = {
    args: {
        images: [],
    },
};
