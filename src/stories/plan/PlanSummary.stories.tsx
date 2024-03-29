import { Meta, StoryObj } from "@storybook/react";
import { MdOutlineDirectionsWalk } from "react-icons/md";
import { PlanSummary } from "src/view/plan/PlanSummary";

export default {
    title: "plan/PlanSummary",
    component: PlanSummary,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PlanSummary>;

type Story = StoryObj<typeof PlanSummary>;

export const Primary: Story = {
    args: {
        title: "移動時間",
        children: "5分",
        icon: MdOutlineDirectionsWalk,
    },
};
