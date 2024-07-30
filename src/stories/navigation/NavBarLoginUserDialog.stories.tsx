import { Meta, StoryObj } from "@storybook/react";
import { NavBarLoginUserDialog } from "src/view/navigation/NavBarUserDialog";

export default {
    title: "navigation/NavBarLoginUserDialog",
    component: NavBarLoginUserDialog,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof NavBarLoginUserDialog>;

type Story = StoryObj<typeof NavBarLoginUserDialog>;

export const Primary: Story = {};
