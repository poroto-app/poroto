import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MdOutlinePlace } from "react-icons/md";
import { Button } from "src/view/common/Button";
import { Box } from "@chakra-ui/react";

export default {
    title: "common/Button",
    component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
    <Box w="400px">
        <Button {...args} icon={MdOutlinePlace} />
    </Box>
);

export const ButtonStoryBook = Template.bind({});
ButtonStoryBook.args = {
    text: "ボタン",
};
