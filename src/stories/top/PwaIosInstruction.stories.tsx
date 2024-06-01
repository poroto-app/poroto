import { Meta, StoryObj } from "@storybook/react";
import {
    PwaInstallInstructionTabs,
    PwaIosInstruction,
} from "src/view/top/PwaIosInstruction";

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

export const iPhone: Story = {
    args: {
        visible: true,
        defaultTab: PwaInstallInstructionTabs.iPhone,
    },
};

export const iPad: Story = {
    args: {
        visible: true,
        defaultTab: PwaInstallInstructionTabs.iPad,
    },
};
