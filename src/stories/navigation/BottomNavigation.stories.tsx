import { Meta, StoryObj } from "@storybook/react";
import {
    BottomNavigation,
    BottomNavigationPages,
} from "src/view/navigation/BottomNavigation";

export default {
    title: "navigation/BottomNavigation",
    component: BottomNavigation,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof BottomNavigation>;

type Story = StoryObj<typeof BottomNavigation>;

export const Primary: Story = {
    args: {
        page: BottomNavigationPages.Home,
    },
    argTypes: {
        page: {
            options: Object.values(BottomNavigationPages),
            control: { type: "select" },
        },
    },
};
