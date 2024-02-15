import { Meta, StoryObj } from "@storybook/react";
import { createArrayWithSize } from "src/domain/util/array";
import { mockPlan } from "src/stories/mock/plan";
import { mockUser } from "src/stories/mock/user";
import { PlanListUser } from "src/view/plan/PlanListUser";

export default {
    title: "plan/PlanListUser",
    component: PlanListUser,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PlanListUser>;

type Story = StoryObj<typeof PlanListUser>;

export const Primary: Story = {
    args: {
        user: mockUser,
        plans: createArrayWithSize(5).map((i) => ({
            id: i,
            ...mockPlan,
        })),
    },
};

export const Loading: Story = {
    args: {
        user: mockUser,
        plans: null,
        isLoading: true,
    },
};

export const Empty: Story = {
    args: {
        user: mockUser,
        plans: [],
    },
};

export const NotLogin: Story = {
    args: {
        user: null,
        plans: [],
    },
};
