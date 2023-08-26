import { Meta, StoryObj } from "@storybook/react";
import { CouldNotFindAnyPlace } from "src/view/interest/CouldNotFindAnyPlace";

export default {
    title: "interest/CouldNotFindAnyPlace",
    component: CouldNotFindAnyPlace,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof CouldNotFindAnyPlace>;

type Story = StoryObj<typeof CouldNotFindAnyPlace>;

export const Primary: Story = {
    args: {},
};
