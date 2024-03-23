import { Meta, StoryObj } from "@storybook/react";
import { MdTrendingUp } from "react-icons/md";
import { PlanListSectionTitle } from "src/view/top/PlanListSectionTitle";

export default {
    title: "top/PlanListSectionTitle",
    component: PlanListSectionTitle,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PlanListSectionTitle>;

type Story = StoryObj<typeof PlanListSectionTitle>;

export const Primary: Story = {
    args: {
        title: "おすすめのプラン",
        icon: MdTrendingUp,
    },
};
