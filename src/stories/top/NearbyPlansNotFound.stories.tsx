import { Meta, StoryObj } from "@storybook/react";
import { NearbyPlansNotFound } from "src/view/top/NearbyPlansNotFound";

export default {
    title: "top/NearbyPlansNotFound",
    component: NearbyPlansNotFound,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof NearbyPlansNotFound>;

type Story = StoryObj<typeof NearbyPlansNotFound>;

export const Primary: Story = {};
