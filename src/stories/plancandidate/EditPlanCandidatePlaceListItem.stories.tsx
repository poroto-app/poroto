import { Box } from "@chakra-ui/react";
import { Meta, StoryObj } from "@storybook/react";
import { mockPlaces } from "src/stories/mock/place";
import { EditPlanCandidatePlaceListItem } from "src/view/plancandidate/EditPlanCandidatePlaceListItem";

export default {
    title: "plan_candidate/EditPlanCandidatePlaceListItem",
    component: EditPlanCandidatePlaceListItem,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof EditPlanCandidatePlaceListItem>;

type Story = StoryObj<typeof EditPlanCandidatePlaceListItem>;

export const Primary: Story = {
    args: {
        place: mockPlaces["bookStore"],
    },
    render: (args) => (
        <Box maxW="600px" w="100%">
            <EditPlanCandidatePlaceListItem {...args} />
        </Box>
    ),
};
