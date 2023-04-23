import { Box } from "@chakra-ui/react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {PlanDurationSelector} from "src/view/interest/PlanDurationSelector";

export default {
    title: "interest/PlanDurationSelector",
    component: PlanDurationSelector
} as ComponentMeta<typeof PlanDurationSelector>;

const Template: ComponentStory<typeof PlanDurationSelector> = (args) => <Box w="100%" maxW="900px">
    <PlanDurationSelector {...args}/>
</Box>

export const PlanDurationSelectorStoryBook = Template.bind({});
PlanDurationSelectorStoryBook.args = {}
