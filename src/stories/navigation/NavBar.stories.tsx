import { Meta, StoryObj } from "@storybook/react";
import { NavBarComponent } from "src/view/navigation/NavBar";

export default {
    title: "common/NavBar",
    component: NavBarComponent,
} as Meta<typeof NavBarComponent>;

type Story = StoryObj<typeof NavBarComponent>;

export const Primary: Story = {
    args: {},
};

export const CanGoBack: Story = {
    args: {
        canGoBack: true,
    },
};
