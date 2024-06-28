import { Meta, StoryObj } from "@storybook/react";
import { CreatePlanRangeDialog } from "src/view/category/CreatePlanRangeDialog";

export default {
    title: "create_plan_category/CreatePlanRangeDialog",
    component: CreatePlanRangeDialog,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof CreatePlanRangeDialog>;

type Story = StoryObj<typeof CreatePlanRangeDialog>;

export const Primary: Story = {
    args: {
        visible: true,
    },
};
