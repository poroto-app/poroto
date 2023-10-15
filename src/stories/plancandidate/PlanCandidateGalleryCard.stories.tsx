import { Meta, StoryObj } from "@storybook/react";
import {PlanCandidateGalleryCard} from "src/view/plancandidate/PlanCandidatesGalleryCard";
import {mockPlans} from "src/stories/mock/plan";

export default {
    title: "plan_candidate/PlanCandidateGalleryCard",
    component: PlanCandidateGalleryCard,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PlanCandidateGalleryCard>;

type Story = StoryObj<typeof PlanCandidateGalleryCard>;

export const Primary: Story = {
    args: {
        plan: mockPlans.cafe,
        isActive: true,
    },
};
