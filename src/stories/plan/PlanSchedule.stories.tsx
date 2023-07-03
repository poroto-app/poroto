import { Meta, StoryObj } from "@storybook/react";
import { mockPlan } from "src/stories/mock/plan";
import { PlanSchedule } from "src/view/plan/PlanSchedule";

export default {
    title: "plan/PlanSchedule",
    component: PlanSchedule,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PlanSchedule>;

type Story = StoryObj<typeof PlanSchedule>;

export const Primary: Story = {
    args: {
        plan: mockPlan,
        startFromCurrentLocation: true,
    },
};
