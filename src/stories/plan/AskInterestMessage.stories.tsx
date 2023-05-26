import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AskInterestMessage } from "src/view/plan/AskInterestMessage";
import { Box } from "@chakra-ui/react";

export default {
    title: "plan/AskInterestMessage",
    component: AskInterestMessage,
} as ComponentMeta<typeof AskInterestMessage>;

const Template: ComponentStory<typeof AskInterestMessage> = (args) => (
    <Box>
        <AskInterestMessage {...args} />
    </Box>
);

export const AskInterestMessageStoryBook = Template.bind({});
AskInterestMessageStoryBook.args = {
    message: "どんな場所に行きたいですか？",
};
