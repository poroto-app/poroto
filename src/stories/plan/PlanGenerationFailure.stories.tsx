import { Meta, StoryObj } from "@storybook/react";
import { PlanGenerationFailure } from "src/view/plan/PlanGenerationFailure";

export default {
    title: "plan/PlanGenerationFailure",
    component: PlanGenerationFailure,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PlanGenerationFailure>;

type Story = StoryObj<typeof PlanGenerationFailure>;

export const Primary: Story = {
    args: {
        navBar: false,
    },
};
