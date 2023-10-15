import { Meta, StoryObj } from "@storybook/react";
import { mockPlans } from "src/stories/mock/plan";
import { PlanCandidateGalleryCard } from "src/view/plancandidate/PlanCandidatesGalleryCard";

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

export const NoImages: Story = {
    args: {
        plan: {
            ...mockPlans.cafe,
            places: mockPlans.cafe.places.map((place) => ({
                ...place,
                images: [],
            })),
        },
        isActive: true,
    },
};
