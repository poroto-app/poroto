import { Meta, StoryObj } from "@storybook/react";
import { mockPlan } from "src/stories/mock/plan";
import { PlaceMap } from "src/view/plan/PlaceMap";

export default {
    title: "plan/PlaceMap",
    component: PlaceMap,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PlaceMap>;

type Story = StoryObj<typeof PlaceMap>;

export const Primary: Story = {
    args: {
        places: mockPlan.places,
    },
};
