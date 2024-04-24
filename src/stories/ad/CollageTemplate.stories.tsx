import { Meta, StoryObj } from "@storybook/react";
import { CollageTemplate } from "src/pages/pr/collage_template";

export default {
    title: "pr/CollageTemplate",
    component: CollageTemplate,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof CollageTemplate>;

type Story = StoryObj<typeof CollageTemplate>;

// 2箇所場所が含まれるプラン
export const PlanWithTwoLocations: Story = {
    args: {
        title: "伊東旅行",
        locations: ["#SKYWALK", "#Beach"],
        durations: [60, 90], // 各場所の滞在時間
        imageUrls: [
            "https://images.pexels.com/photos/347137/pexels-photo-347137.jpeg",
            "https://images.pexels.com/photos/1118049/pexels-photo-1118049.jpeg",
        ],
        introduction:
            "静岡県の伊東は海と山に囲まれた自然豊かな地.山々を見渡せるSKYWALKや新鮮な海の幸が味わえる海女の小屋など、見所盛りだくさんです.",
    },
};

// 3箇所場所が含まれるプラン
export const PlanWithThreeLocations: Story = {
    args: {
        title: "伊東旅行",
        locations: ["#SKYWALK", "#Beach", "#HotSpring"],
        durations: [60, 90, 120], // 各場所の滞在時間
        imageUrls: [
            "https://images.pexels.com/photos/347137/pexels-photo-347137.jpeg",
            "https://images.pexels.com/photos/1118049/pexels-photo-1118049.jpeg",
            "https://images.pexels.com/photos/219998/pexels-photo-219998.jpeg",
        ],
        introduction:
            "静岡県の伊東は海と山に囲まれた自然豊かな地.山々を見渡せるSKYWALKや新鮮な海の幸が味わえる海女の小屋など、見所盛りだくさんです.",
    },
};

// 4箇所場所が含まれるプラン
export const PlanWithFourLocations: Story = {
    args: {
        title: "伊東旅行",
        locations: ["#SKYWALK", "#Beach", "#HotSpring", "#Castle"],
        durations: [60, 90, 120, 180], // 各場所の滞在時間
        imageUrls: [
            "https://images.pexels.com/photos/347137/pexels-photo-347137.jpeg",
            "https://images.pexels.com/photos/1118049/pexels-photo-1118049.jpeg",
            "https://images.pexels.com/photos/219998/pexels-photo-219998.jpeg",
            "https://images.pexels.com/photos/297940/pexels-photo-297940.jpeg",
        ],
        introduction:
            "静岡県の伊東は海と山に囲まれた自然豊かな地.山々を見渡せるSKYWALKや新鮮な海の幸が味わえる海女の小屋など、見所盛りだくさんです.",
    },
};
