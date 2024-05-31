import { Box } from "@chakra-ui/react";
import { Meta, StoryObj } from "@storybook/react";
import { NotLoggedIn } from "src/view/account/NotLoggedIn";

export default {
    title: "account/NotLoggedIn",
    component: NotLoggedIn,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof NotLoggedIn>;

type Story = StoryObj<typeof NotLoggedIn>;

export const Primary: Story = {};

export const Sp: Story = {
    parameters: {
        layout: "fullscreen",
        viewport: {
            defaultViewport: "iphonex",
        },
    },
    render: () => (
        <Box h="100vh">
            <NotLoggedIn />
        </Box>
    ),
};
