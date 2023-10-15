import { Box } from "@chakra-ui/react";
import { Meta, StoryObj } from "@storybook/react";
import { mockPlaces } from "src/stories/mock/place";
import { DialogRelatedPlaces } from "src/view/plancandidate/DialogRelatedPlaces";

export default {
    title: "plan_candidate/DialogRelatedPlaces",
    component: DialogRelatedPlaces,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof DialogRelatedPlaces>;

type Story = StoryObj<typeof DialogRelatedPlaces>;

export const Primary: Story = {
    args: {
        title: "Related Places",
        visible: true,
        places: [mockPlaces.bookStore, mockPlaces.tokyo, mockPlaces.marunouchi],
    },
    render: (args) => (
        <Box w="100%" h="800px">
            <DialogRelatedPlaces {...args} />
        </Box>
    ),
};

export const Loading: Story = {
    args: {
        title: "Related Places",
        visible: true,
        places: null,
    },
    render: (args) => (
        <Box w="100%" h="800px">
            <DialogRelatedPlaces {...args} />
        </Box>
    ),
};
