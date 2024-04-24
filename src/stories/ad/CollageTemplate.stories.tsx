import { Meta, StoryObj } from "@storybook/react";
import { CollageTemplate } from "src/pages/pr/collage_template";

export default {
    title: "pr/CollageTemplate",
    component: CollageTemplate,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof CollageTemplate>;

type Story = StoryObj<typeof CollageTemplate>;

export const Primary: Story = {
    args: {
        title: "伊東旅行",
        location: "#SKYWALK",
        duration: 60,
        imageUrl:
            "https://images.pexels.com/photos/347137/pexels-photo-347137.jpeg",
        introduction:
            "静岡県の伊東は海と山に囲まれた自然豊かな地.山々を見渡せるSKYWALKや新鮮な海の幸が味わえる海女の小屋など、見所盛りだくさんです.",
    },
};
