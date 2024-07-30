import { Meta, StoryObj } from "@storybook/react";
import { TrendingUp } from "@tamagui/lucide-icons";
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
        icon: TrendingUp,
    },
};
