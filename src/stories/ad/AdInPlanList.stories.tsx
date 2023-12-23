import { Box } from "@chakra-ui/react";
import { Meta, StoryObj } from "@storybook/react";
import { AdInPlanList } from "src/view/ad/AdInPlanList";

export default {
    title: "ad/AdInPlanList",
    component: AdInPlanList,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof AdInPlanList>;

type Story = StoryObj<typeof AdInPlanList>;

export const Primary: Story = {
    render: () => (
        <Box w="400px" h="400px">
            <AdInPlanList />
        </Box>
    ),
};
