import { Box, Text } from "@chakra-ui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { RoundedButton } from "src/view/common/RoundedButton";

export default {
    title: "common/RoundedButton",
    component: RoundedButton,
} as ComponentMeta<typeof RoundedButton>;

const Template: ComponentStory<typeof RoundedButton> = (args) => (
    <Box w="400px">
        <RoundedButton {...args}>
            <Text>ボタン</Text>
        </RoundedButton>
    </Box>
);

export const Primary = Template.bind({});
Primary.args = {
    text: "ボタン",
};

export const Disabled = Template.bind({});
Disabled.args = {
    text: "ボタン",
    disabled: true,
};

export const Outlined = Template.bind({});
Outlined.args = {
    text: "ボタン",
    outlined: true,
};
