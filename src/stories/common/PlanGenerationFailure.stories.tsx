import { Meta, StoryObj } from "@storybook/react";
import { PlanGenerationFailure } from "src/view/common/PlanGenerationFailure";

export default {
    title: "common/PlanGenerationFailure",
    component: PlanGenerationFailure,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PlanGenerationFailure>;

type Story = StoryObj<typeof PlanGenerationFailure>;

export const Primary: Story = {
    args: {},
};
