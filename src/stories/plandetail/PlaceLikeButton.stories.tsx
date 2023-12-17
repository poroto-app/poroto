import { Meta, StoryObj } from "@storybook/react";
import { PlaceLikeButton } from "src/view/plandetail/PlaceLikeButton";

export default {
    title: "plan_detail/PlaceLikeButton",
    component: PlaceLikeButton,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PlaceLikeButton>;

type Story = StoryObj<typeof PlaceLikeButton>;

export const Primary: Story = {
    args: {
        isLiked: false,
        likeCount: 100,
        onUpdateLike: () => 0,
    },
};
