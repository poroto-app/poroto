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
        placeNameToBeUpdated: "横浜駅",
        visible: true,
        updating: false,
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
        dialogTitle: "「横浜駅」に関連する場所",
        placeNameToBeUpdated: "横浜駅",
        visible: true,
        updating: false,
        places: null,
    },
    render: (args) => (
        <Box w="100%" h="800px">
            <DialogRelatedPlaces {...args} />
        </Box>
    ),
};

export const Replacing: Story = {
    args: {
        placeNameToBeUpdated: "横浜駅",
        visible: true,
        places: [mockPlaces.bookStore, mockPlaces.tokyo, mockPlaces.marunouchi],
    },
    render: (args) => (
        <Box w="100%" h="800px">
            <DialogRelatedPlaces {...args} updating />
        </Box>
    ),
};
