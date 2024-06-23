import { Meta, StoryObj } from "@storybook/react";
import { CreatePlanCategoryList } from "src/view/category/CreatePlanCategoryList";

export default {
    title: "create_plan_category/CreatePlanCategoryList",
    component: CreatePlanCategoryList,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof CreatePlanCategoryList>;

type Story = StoryObj<typeof CreatePlanCategoryList>;

export const Primary: Story = {
    args: {
        categorySets: [
            {
                displayName: "食事",
                categories: [
                    {
                        id: "1",
                        imageUrl: "https://picsum.photos/id/218/600/600",
                        displayName: "カフェ",
                    },
                    {
                        id: "2",
                        imageUrl: "https://picsum.photos/id/219/600/600",
                        displayName: "レストラン",
                    },
                ],
            },
            {
                displayName: "観光",
                categories: [
                    {
                        id: "3",
                        imageUrl: "https://picsum.photos/id/220/600/600",
                        displayName: "観光スポット",
                    },
                    {
                        id: "4",
                        imageUrl: "https://picsum.photos/id/221/600/600",
                        displayName: "寺・神社",
                    },
                ],
            },
        ],
    },
};
