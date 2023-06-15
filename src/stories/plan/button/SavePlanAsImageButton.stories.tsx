import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SavePlanAsImageButton } from "src/view/plan/button/SavePlanAsImageButton";
import { mockPlan } from "src/stories/mock/plan";
import { Box } from "@chakra-ui/react";

export default {
    title: "plan/button/SavePlanAsImageButton",
    component: SavePlanAsImageButton,
} as ComponentMeta<typeof SavePlanAsImageButton>;

const Template: ComponentStory<typeof SavePlanAsImageButton> = (args) => (
    <Box w="400px">
        <SavePlanAsImageButton {...args} />
    </Box>
);

export const SavePlanAsImageButtonStoryBook = Template.bind({});
SavePlanAsImageButtonStoryBook.args = {
    plan: mockPlan,
};
