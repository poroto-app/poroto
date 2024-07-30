import { Meta, StoryObj } from "@storybook/react";
import { NavBarNonLoginUserDialog } from "src/view/navigation/NavBarUserDialog";

export default {
    title: "navigation/NavBarNonLoginUserDialog",
    component: NavBarNonLoginUserDialog,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof NavBarNonLoginUserDialog>;

type Story = StoryObj<typeof NavBarNonLoginUserDialog>;

export const Primary: Story = {};
