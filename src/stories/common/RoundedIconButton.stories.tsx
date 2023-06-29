import { Box, Text } from "@chakra-ui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MdOutlinePlace } from "react-icons/md";
import { RoundedIconButton } from "src/view/common/RoundedIconButton";

export default {
    title: "common/RoundedIconButton",
    component: RoundedIconButton,
} as ComponentMeta<typeof RoundedIconButton>;

const Template: ComponentStory<typeof RoundedIconButton> = (args) => (
    <Box w="400px">
        <RoundedIconButton {...args} icon={MdOutlinePlace}>
            <Text>ボタン</Text>
        </RoundedIconButton>
    </Box>
);

export const Primary = Template.bind({});
Primary.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
};
