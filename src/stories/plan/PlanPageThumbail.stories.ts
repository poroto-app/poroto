import { Meta, StoryObj } from "@storybook/react";
import { mockPlan } from "src/stories/mock/plan";
import { PlanPageThumbnail } from "src/view/plan/PlanPageThumbnail";

export default {
    title: "plan/PlanPageThumbnail",
    component: PlanPageThumbnail,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PlanPageThumbnail>;

type Story = StoryObj<typeof PlanPageThumbnail>;

export const Primary: Story = {
    args: {
        plan: mockPlan,
    },
};

export const LongTitle: Story = {
    args: {
        plan: {
            ...mockPlan,
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl.",
        },
    },
};
