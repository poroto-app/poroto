import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { mockPlans } from "src/stories/mock/plan";
import { PlanCandidatesGallery } from "src/view/plancandidate/PlanCandidatesGallery";

export default {
    title: "plan_candidate/PlanCandidatesGallery",
    component: PlanCandidatesGallery,
    tags: ["autodocs"],
    parameters: {},
    args: {
        onActiveIndexChange: fn(),
    },
} as Meta<typeof PlanCandidatesGallery>;

type Story = StoryObj<typeof PlanCandidatesGallery>;

export const Primary: Story = {
    args: {
        planCandidates: [mockPlans.cafe, mockPlans.bookStore, mockPlans.tokyo],
    },
};
