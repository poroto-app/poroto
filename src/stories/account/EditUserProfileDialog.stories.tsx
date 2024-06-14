import { Meta, StoryObj } from "@storybook/react";
import { mockUser } from "src/stories/mock/user";
import { EditUserProfileDialog } from "src/view/account/EditUserProfileDialog";

export default {
    title: "account/EditUserProfileDialog",
    component: EditUserProfileDialog,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof EditUserProfileDialog>;

type Story = StoryObj<typeof EditUserProfileDialog>;

export const Primary: Story = {
    args: {
        isVisible: true,
        user: {
            ...mockUser,
            avatarImage: "https://picsum.photos/id/45/1280/720",
        },
    },
};
