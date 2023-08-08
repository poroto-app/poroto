import { Meta, StoryObj } from "@storybook/react";
import { mockPlan } from "src/stories/mock/plan";
import { AvailablePlaceSection } from "src/view/plan/candidate/AvailablePlaceSection";

export default {
    title: "plan/candidate/AvailablePlaceSection",
    component: AvailablePlaceSection,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof AvailablePlaceSection>;

type Story = StoryObj<typeof AvailablePlaceSection>;

export const Primary: Story = {
    args: {
        places: mockPlan.places,
        isFetching: false,
    },
};

export const Loading: Story = {
    args: {
        places: null,
        isFetching: true,
    },
};

export const Empty: Story = {
    args: {
        places: [],
        isFetching: false,
    },
};

export const Null: Story = {
    args: {
        places: null,
        isFetching: false,
    },
};
