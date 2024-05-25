import { Box } from "@chakra-ui/react";
import { Meta, StoryFn } from "@storybook/react";
import { NavBarComponent } from "src/view/navigation/NavBar";
import { MatchInterestPageTemplate } from "src/view/plan/MatchInterestPageTemplate";

export default {
    title: "plan/MatchInterestPageTemplate",
    component: MatchInterestPageTemplate,
} as Meta<typeof MatchInterestPageTemplate>;

const Template: StoryFn<typeof MatchInterestPageTemplate> = ({ message }) => (
    <MatchInterestPageTemplate message={message} navBar={<NavBarComponent />}>
        <Box w="100%" h="100%" backgroundColor="gray" />
    </MatchInterestPageTemplate>
);

export const MatchInterestPageTemplateStoryBook = Template.bind({});
MatchInterestPageTemplateStoryBook.args = {};
