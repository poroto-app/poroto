import { Meta, StoryObj } from "@storybook/react";
import { GeneratingPlanDialog } from "src/view/plan/candidate/GeneratingPlanDialog";

export default {
    title: "plan/candidate/GeneratingPlanDialog",
    component: GeneratingPlanDialog,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof GeneratingPlanDialog>;

type Story = StoryObj<typeof GeneratingPlanDialog>;

export const Primary: Story = {
    args: {
        visible: true,
        failed: false,
    },
};

export const Failed: Story = {
    args: {
        visible: true,
        failed: true,
    },
};
