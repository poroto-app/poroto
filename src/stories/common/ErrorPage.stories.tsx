import { Meta, StoryObj } from "@storybook/react";
import { ErrorPage } from "src/view/common/ErrorPage";

export default {
    title: "common/ErrorPage",
    component: ErrorPage,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof ErrorPage>;

type Story = StoryObj<typeof ErrorPage>;

export const Primary: Story = {
    args: {},
};
