import { Meta, StoryObj } from "@storybook/react";
import { PlanCreatedDialog } from "src/view/plan/PlanCreatedDialog";

export default {
    title: "plan/PlanCreatedDialog",
    component: PlanCreatedDialog,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PlanCreatedDialog>;

type Story = StoryObj<typeof PlanCreatedDialog>;

export const Primary: Story = {
    args: {
        visible: true,
    },
};
