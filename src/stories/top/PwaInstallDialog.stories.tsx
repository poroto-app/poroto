import { Meta, StoryObj } from "@storybook/react";
import { PwaInstallDialog } from "src/view/top/PwaInstallDialog";

export default {
    title: "top/PwaInstallDialog",
    component: PwaInstallDialog,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PwaInstallDialog>;

type Story = StoryObj<typeof PwaInstallDialog>;

export const Primary: Story = {
    args: {
        visible: true,
    },
};
