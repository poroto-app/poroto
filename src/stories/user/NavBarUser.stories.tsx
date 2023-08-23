import { Meta, StoryObj } from "@storybook/react";
import { NavBarComponent } from "src/view/common/NavBar";
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
    },
    render: (args) => (
        <NavBarComponent
            canBack={false}
            onBack={() => 0}
            userComponent={<NavBarUser {...args} />}
        />
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
        <NavBarComponent
            canBack={false}
            onBack={() => 0}
            userComponent={<NavBarUser {...args} />}
        />
    ),
};
