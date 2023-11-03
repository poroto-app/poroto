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
        dialogTitle: "「横浜駅」に関連する場所",
        places: [mockPlaces.bookStore, mockPlaces.tokyo, mockPlaces.marunouchi],
        updating: false,
        buttonLabelSelectPlace: "この場所を入れ替える",
        buttonLabelUpdatePlace: "入れ替える",
        titleConfirmUpdate: () => "「A」を「B」と入れ替えますか？",
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
        visible: true,
        updating: false,
        places: null,
        buttonLabelSelectPlace: "この場所を入れ替える",
        buttonLabelUpdatePlace: "入れ替える",
        titleConfirmUpdate: () => "「A」を「B」と入れ替えますか？",
    },
    render: (args) => (
        <Box w="100%" h="800px">
            <DialogRelatedPlaces {...args} />
        </Box>
    ),
};

export const Replacing: Story = {
    args: {
        visible: true,
        updating: true,
        places: [mockPlaces.bookStore, mockPlaces.tokyo, mockPlaces.marunouchi],
        buttonLabelSelectPlace: "この場所を入れ替える",
        buttonLabelUpdatePlace: "入れ替える",
        titleConfirmUpdate: () => "「A」を「B」と入れ替えますか？",
    },
    render: (args) => (
        <Box w="100%" h="800px">
            <DialogRelatedPlaces {...args} updating />
        </Box>
    ),
};
