import { Meta, StoryObj } from "@storybook/react";
import { mockPlan } from "src/stories/mock/plan";
import { PlanPageSectionSummary } from "src/view/plan//section/PlanPageSectionSummary";

export default {
    title: "plan/PlanPageSectionSummary",
    component: PlanPageSectionSummary,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PlanPageSectionSummary>;

type Story = StoryObj<typeof PlanPageSectionSummary>;

export const Primary: Story = {
    args: {
        planDurationInMinutes: mockPlan.timeInMinutes,
    },
};
