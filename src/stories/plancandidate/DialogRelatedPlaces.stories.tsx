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
        visible: true,
        titleSelectScreen: "「横浜駅」に関連する場所",
        titleConfirmScreen: "この場所と入れ替えますか？",
        places: [mockPlaces.bookStore, mockPlaces.tokyo, mockPlaces.marunouchi],
        updating: false,
        buttonLabelUpdatePlace: "入れ替える",
    },
    render: (args) => (
        <Box w="100%" h="800px">
            <DialogRelatedPlaces {...args} />
        </Box>
    ),
};

export const Loading: Story = {
    args: {
        titleSelectScreen: "「横浜駅」に関連する場所",
        titleConfirmScreen: "この場所と入れ替えますか？",
        visible: true,
        updating: false,
        places: null,
        buttonLabelUpdatePlace: "入れ替える",
    },
    render: (args) => (
        <Box w="100%" h="800px">
            <DialogRelatedPlaces {...args} />
        </Box>
    ),
};

export const Replacing: Story = {
    args: {
        titleSelectScreen: "「横浜駅」に関連する場所",
        titleConfirmScreen: "この場所を入れ替えますか？",
        visible: true,
        updating: true,
        places: [mockPlaces.bookStore, mockPlaces.tokyo, mockPlaces.marunouchi],
        buttonLabelUpdatePlace: "入れ替える",
    },
    render: (args) => (
        <Box w="100%" h="800px">
            <DialogRelatedPlaces {...args} updating />
        </Box>
    ),
};
