import { Box } from "@chakra-ui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MdOutlinePlace } from "react-icons/md";
import { RoundedButton } from "src/view/common/RoundedButton";

export default {
    title: "common/RoundedButton",
    component: RoundedButton,
} as ComponentMeta<typeof RoundedButton>;

const Template: ComponentStory<typeof RoundedButton> = (args) => (
    <Box w="400px">
        <RoundedButton {...args} icon={MdOutlinePlace} />
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
