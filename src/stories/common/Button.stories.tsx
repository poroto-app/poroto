import { Box } from "@chakra-ui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MdOutlinePlace } from "react-icons/md";
import { ButtonRounded } from "src/view/common/ButtonRounded";

export default {
    title: "common/ButtonRounded",
    component: ButtonRounded,
} as ComponentMeta<typeof ButtonRounded>;

const Template: ComponentStory<typeof ButtonRounded> = (args) => (
    <Box w="400px">
        <ButtonRounded {...args} icon={MdOutlinePlace} />
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
