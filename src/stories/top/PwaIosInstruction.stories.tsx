import { Meta, StoryObj } from "@storybook/react";
import { PwaIosInstruction } from "src/view/top/PwaIosInstruction";

export default {
    title: "top/PwaIosInstruction",
    component: PwaIosInstruction,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PwaIosInstruction>;

type Story = StoryObj<typeof PwaIosInstruction>;

export const Primary: Story = {
    args: {
        visible: true,
    },
};
