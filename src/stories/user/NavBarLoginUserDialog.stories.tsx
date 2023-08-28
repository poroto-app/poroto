import { Meta, StoryObj } from "@storybook/react";
import { NavBarLoginUserDialog } from "src/view/user/NavBarUserDialog";

export default {
    title: "user/NavBarLoginUserDialog",
    component: NavBarLoginUserDialog,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof NavBarLoginUserDialog>;

type Story = StoryObj<typeof NavBarLoginUserDialog>;

export const Primary: Story = {};
