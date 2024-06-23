import { Meta, StoryObj } from "@storybook/react";
import { CreatePlanCategory } from "src/view/category/CreatePlanCategory";

export default {
    title: "create_plan_category/CreatePlanCategory",
    component: CreatePlanCategory,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof CreatePlanCategory>;

type Story = StoryObj<typeof CreatePlanCategory>;

export const Primary: Story = {
    args: {
        category: {
            id: "1",
            imageUrl: "https://picsum.photos/id/218/600/600",
            displayName: "動物園",
        },
    },
};
