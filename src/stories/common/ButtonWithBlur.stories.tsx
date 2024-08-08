import { Text } from "@chakra-ui/react";
import { Meta, StoryObj } from "@storybook/react";
import { ButtonWithBlur } from "src/view/common/ButtonWithBlur";

export default {
    title: "common/ButtonWithBlur",
    component: ButtonWithBlur,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof ButtonWithBlur>;

type Story = StoryObj<typeof ButtonWithBlur>;

export const Primary: Story = {
    argTypes: {
        backgroundColor: { control: "color" },
    },
    args: {
        backgroundColor: "#84A6FF",
    },
    render: (args) => (
        <ButtonWithBlur px={16} py={16} borderRadius={5} {...args}>
            <Text>Button</Text>
        </ButtonWithBlur>
    ),
};
