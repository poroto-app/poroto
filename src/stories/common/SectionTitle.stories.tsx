import { Meta, StoryObj } from "@storybook/react";
import { SectionTitle } from "src/view/common/SectionTitle";

export default {
    title: "common/SectionTitle",
    component: SectionTitle,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof SectionTitle>;

type Story = StoryObj<typeof SectionTitle>;

export const Primary: Story = {
    args: {
        title: "Title",
    },
};
