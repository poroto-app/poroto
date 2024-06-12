import { Meta, StoryObj } from "@storybook/react";
import { mockUser } from "src/stories/mock/user";
import { UserCard } from "src/view/account/UserCard";

export default {
    title: "account/UserCard",
    component: UserCard,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof UserCard>;

type Story = StoryObj<typeof UserCard>;

export const Primary: Story = {
    args: {
        user: mockUser,
    },
};

export const Loading: Story = {
    args: {
        user: null,
    },
};

export const Editable: Story = {
    args: {
        user: mockUser,
        isEditable: true,
    },
};

export const Editing: Story = {
    args: {
        user: mockUser,
        isEditing: true,
    },
};
