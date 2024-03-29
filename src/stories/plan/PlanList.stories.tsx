import { Meta, StoryObj } from "@storybook/react";
import { createArrayWithSize } from "src/domain/util/array";
import { mockPlan } from "src/stories/mock/plan";
import { PlanList } from "src/view/plan/PlanList";

export default {
    title: "plan/PlanList",
    component: PlanList,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PlanList>;

type Story = StoryObj<typeof PlanList>;

export const Primary: Story = {
    args: {
        plans: createArrayWithSize(5).map((i) => ({
            id: i,
            ...mockPlan,
        })),
    },
};

export const Null: Story = {
    args: {
        plans: null,
    },
};

export const Loading: Story = {
    args: {
        plans: null,
        isLoading: true,
    },
};

export const Empty: Story = {
    args: {
        plans: [],
    },
};

export const EmptyWithComponent: Story = {
    args: {
        plans: [],
        empty: <p>Empty</p>,
    },
};

export const Horizontal: Story = {
    args: {
        plans: createArrayWithSize(5).map((i) => ({
            id: i,
            ...mockPlan,
        })),
        grid: false,
    },
};
