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
