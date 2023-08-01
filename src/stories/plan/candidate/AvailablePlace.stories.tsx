import { Meta, StoryObj } from "@storybook/react";
import { mockPlan } from "src/stories/mock/plan";
import { AvailablePlace } from "src/view/plan/candidate/AvailablePlace";

export default {
    title: "plan/candidate/AvailablePlace",
    component: AvailablePlace,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof AvailablePlace>;

type Story = StoryObj<typeof AvailablePlace>;

export const Primary: Story = {
    args: {
        place: mockPlan.places[0],
    },
};

export const Loading: Story = {
    args: {
        place: null,
    },
};
