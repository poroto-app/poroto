import { Meta, StoryObj } from "@storybook/react";
import { CollageTemplate } from "src/view/plandetail/CollageTemplate";

export default {
    title: "plan_detail/CollageTemplate",
    component: CollageTemplate,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof CollageTemplate>;

type Story = StoryObj<typeof CollageTemplate>;

type CollagePlace = {
    name: string;
    duration: number;
    imageUrl: string;
};

export const PlanWithTwoPlaces: Story = {
    args: {
        title: "伊東旅行",
        places: [
            {
                name: "#SKYWALK",
                duration: 60,
                imageUrl:
                    "https://images.pexels.com/photos/347137/pexels-photo-347137.jpeg",
            },
            {
                name: "#Beach",
                duration: 90,
                imageUrl:
                    "https://images.pexels.com/photos/1118049/pexels-photo-1118049.jpeg",
            },
        ],
        introduction:
            "静岡県の伊東は海と山に囲まれた自然豊かな地.山々を見渡せるSKYWALKや新鮮な海の幸が味わえる海女の小屋など、見所盛りだくさんです.",
    },
};

export const PlanWithThreeLocations: Story = {
    args: {
        title: "伊東旅行",
        places: [
            {
                name: "#SKYWALK",
                duration: 60,
                imageUrl:
                    "https://images.pexels.com/photos/347137/pexels-photo-347137.jpeg",
            },
            {
                name: "#Beach",
                duration: 90,
                imageUrl:
                    "https://images.pexels.com/photos/1118049/pexels-photo-1118049.jpeg",
            },
            {
                name: "#HotSpring",
                duration: 120,
                imageUrl:
                    "https://images.pexels.com/photos/219998/pexels-photo-219998.jpeg",
            },
        ],
        introduction:
            "静岡県の伊東は海と山に囲まれた自然豊かな地.山々を見渡せるSKYWALKや新鮮な海の幸が味わえる海女の小屋など、見所盛りだくさんです.",
    },
};

export const PlanWithFourLocations: Story = {
    args: {
        title: "伊東旅行",
        places: [
            {
                name: "#SKYWALK",
                duration: 60,
                imageUrl:
                    "https://images.pexels.com/photos/347137/pexels-photo-347137.jpeg",
            },
            {
                name: "#Beach",
                duration: 90,
                imageUrl:
                    "https://images.pexels.com/photos/1118049/pexels-photo-1118049.jpeg",
            },
            {
                name: "#HotSpring",
                duration: 120,
                imageUrl:
                    "https://images.pexels.com/photos/219998/pexels-photo-219998.jpeg",
            },
            {
                name: "#Castle",
                duration: 180,
                imageUrl:
                    "https://images.pexels.com/photos/297940/pexels-photo-297940.jpeg",
            },
        ],
        introduction:
            "静岡県の伊東は海と山に囲まれた自然豊かな地.山々を見渡せるSKYWALKや新鮮な海の幸が味わえる海女の小屋など、見所盛りだくさんです.",
    },
};
