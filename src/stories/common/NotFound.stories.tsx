import { Meta, StoryObj } from "@storybook/react";
import { NotFound } from "src/view/common/NotFound";

export default {
    title: "common/NotFound",
    component: NotFound,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof NotFound>;

type Story = StoryObj<typeof NotFound>;

export const Primary: Story = {
    args: {},
};
