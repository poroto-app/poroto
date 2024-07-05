import { Meta, StoryObj } from "@storybook/react";
import { Error } from "src/view/common/Error";

export default {
    title: "common/Error",
    component: Error,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof Error>;

type Story = StoryObj<typeof Error>;

export const Primary: Story = {
    args: {
        navBar: false,
    },
};
