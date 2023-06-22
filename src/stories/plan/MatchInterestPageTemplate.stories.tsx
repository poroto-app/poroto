import { Box } from "@chakra-ui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { NavBarComponent } from "src/view/common/NavBar";
import { MatchInterestPageTemplate } from "src/view/plan/MatchInterestPageTemplate";

export default {
    title: "plan/MatchInterestPageTemplate",
    component: MatchInterestPageTemplate,
} as ComponentMeta<typeof MatchInterestPageTemplate>;

const Template: ComponentStory<typeof MatchInterestPageTemplate> = ({
    message,
}) => (
    <MatchInterestPageTemplate
        message={message}
        navBar={
            <NavBarComponent
                title="今の気分を教えてください"
                canBack={true}
                onBack={() => 0}
            />
        }
    >
        <Box w="100%" h="100%" backgroundColor="gray" />
    </MatchInterestPageTemplate>
);

export const MatchInterestPageTemplateStoryBook = Template.bind({});
MatchInterestPageTemplateStoryBook.args = {
    message: "あなたの行きたい場所を教えてください。",
};
