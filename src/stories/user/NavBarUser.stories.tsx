import { Meta, StoryObj } from "@storybook/react";
import { NavBarComponent } from "src/view/navigation/NavBar";
import { NavBarUser } from "src/view/user/NavBarUser";

export default {
    title: "user/NavBarUser",
    component: NavBarUser,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof NavBarUser>;

type Story = StoryObj<typeof NavBarUser>;

export const Primary: Story = {
    args: {
        user: null,
        onBindPreLoginState: undefined,
    },
    render: (args) => (
        <NavBarComponent userComponent={<NavBarUser {...args} />} />
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
        onBindPreLoginState: undefined,
    },
    render: (args) => (
        <NavBarComponent userComponent={<NavBarUser {...args} />} />
    ),
};

export const BindPreLoginState: Story = {
    args: {
        user: {
            id: "1",
            name: "test",
            avatarImage:
                "https://avatars.githubusercontent.com/u/8108337?v=3&s=400",
        },
        onBindPreLoginState: () => alert("bindPreLoginState"),
    },
    render: (args) => (
        <NavBarComponent userComponent={<NavBarUser {...args} />} />
    ),
};
