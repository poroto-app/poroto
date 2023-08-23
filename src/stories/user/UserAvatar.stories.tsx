import { Meta, StoryObj } from "@storybook/react";
import { UserAvatar } from "src/view/user/UserAvatar";
import {Box, HStack} from "@chakra-ui/react";

export default {
    title: "user/UserAvatar",
    component: UserAvatar,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof UserAvatar>;

type Story = StoryObj<typeof UserAvatar>;

export const Primary: Story = {
    args: {
        user: null,
    },
    render: (args) => (
        <HStack h="50px">
            <UserAvatar {...args} />
        </HStack>
    ),
};

export const LoggedIn: Story = {
    args: {
        user: {
            id: "1",
            name: "test",
            avatarImage:
                "https://avatars.githubusercontent.com/u/8108337?v=3&s=400",
        },
    },
    render: (args) => (
        <HStack h="50px">
            <UserAvatar {...args} />
        </HStack>
    ),
};
