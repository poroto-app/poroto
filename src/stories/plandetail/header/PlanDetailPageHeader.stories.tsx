import { Meta, StoryObj } from "@storybook/react";
import { mockPlan } from "src/stories/mock/plan";
import { PlanDetailPageHeader } from "src/view/plandetail/header/PlanDetailPageHeader";

export default {
    title: "plan_detail/PlanDetailPageHeader",
    component: PlanDetailPageHeader,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PlanDetailPageHeader>;

type Story = StoryObj<typeof PlanDetailPageHeader>;

export const Primary: Story = {
    args: {
        plan: mockPlan,
        likedPlaceIds: [],
    },
};
