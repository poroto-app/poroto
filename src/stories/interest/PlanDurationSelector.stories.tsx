import { Box } from "@chakra-ui/react";
import { Meta, StoryObj } from "@storybook/react";
import { PlanDurationSelector } from "src/view/interest/PlanDurationSelector";

export default {
    title: "interest/PlanDurationSelector",
    component: PlanDurationSelector,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PlanDurationSelector>;

type Story = StoryObj<typeof PlanDurationSelector>;

export const Primary: Story = {
    render: (args) => (
        <Box w="400px" h="400px">
            <PlanDurationSelector {...args} />
        </Box>
    ),
};
