import { Box } from "@chakra-ui/react";
import { Meta, StoryFn } from "@storybook/react";
import { mockPlan } from "src/stories/mock/plan";
import { SavePlanAsImageButton } from "src/view/plan/button/SavePlanAsImageButton";

export default {
    title: "plan/button/SavePlanAsImageButton",
    component: SavePlanAsImageButton,
} as Meta<typeof SavePlanAsImageButton>;

const Template: StoryFn<typeof SavePlanAsImageButton> = (args) => (
    <Box w="400px">
        <SavePlanAsImageButton {...args} />
    </Box>
);

export const SavePlanAsImageButtonStoryBook = Template.bind({});
SavePlanAsImageButtonStoryBook.args = {
    plan: mockPlan,
};
