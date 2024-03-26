import { Box } from "@chakra-ui/react";
import { Meta, StoryObj } from "@storybook/react";
import { PlaceCategoryTypes } from "src/domain/models/PlaceCategory";
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
        placesRecommended: [
            mockPlaces.bookStore,
            mockPlaces.tokyo,
            mockPlaces.marunouchi,
        ],
        placesWithCategories: [
            {
                category: {
                    id: PlaceCategoryTypes.Camp,
                    displayName: "キャンプ",
                },
                places: [
                    mockPlaces.tokyo,
                    mockPlaces.bookStore,
                    mockPlaces.marunouchi,
                ],
            },
            {
                category: {
                    id: PlaceCategoryTypes.Cafe,
                    displayName: "カフェ",
                },
                places: [
                    mockPlaces.bookStore,
                    mockPlaces.tokyo,
                    mockPlaces.marunouchi,
                ],
            },
            {
                category: {
                    id: PlaceCategoryTypes.Culture,
                    displayName: "文化",
                },
                places: [
                    mockPlaces.bookStore,
                    mockPlaces.tokyo,
                    mockPlaces.marunouchi,
                ],
            },
            {
                category: {
                    id: PlaceCategoryTypes.Restaurant,
                    displayName: "レストラン",
                },
                places: [
                    mockPlaces.bookStore,
                    mockPlaces.tokyo,
                    mockPlaces.marunouchi,
                ],
            },
            {
                category: {
                    id: PlaceCategoryTypes.Amusements,
                    displayName: "アミューズメント",
                },
                places: [
                    mockPlaces.bookStore,
                    mockPlaces.tokyo,
                    mockPlaces.marunouchi,
                ],
            },
        ],
        updating: false,
        buttonLabelUpdatePlace: "入れ替える",
    },
    render: (args) => (
        <Box w="100%" h="800px">
            <DialogRelatedPlaces {...args} />
        </Box>
    ),
};

export const Transition: Story = {
    args: {
        visible: true,
        titleSelectScreen: "「横浜駅」に関連する場所",
        titleConfirmScreen: "この場所と入れ替えますか？",
        placesRecommended: [
            mockPlaces.bookStore,
            mockPlaces.tokyo,
            mockPlaces.marunouchi,
        ],
        placesWithCategories: [],
        transitions: [
            {
                fromPlaceId: null,
                toPlaceId: mockPlaces.bookStore.id,
                durationInMinutes: 30,
            },
            {
                fromPlaceId: mockPlaces.bookStore.id,
                toPlaceId: mockPlaces.tokyo.id,
                durationInMinutes: 50,
            },
            {
                fromPlaceId: mockPlaces.tokyo.id,
                toPlaceId: mockPlaces.marunouchi.id,
                durationInMinutes: 40,
            },
        ],
        updating: false,
        buttonLabelUpdatePlace: "入れ替える",
    },
    render: (args) => (
        <Box w="100%" h="800px">
            <DialogRelatedPlaces {...args} />
        </Box>
    ),
};

export const WoCategory: Story = {
    args: {
        visible: true,
        titleSelectScreen: "「横浜駅」に関連する場所",
        titleConfirmScreen: "この場所と入れ替えますか？",
        placesRecommended: [
            mockPlaces.bookStore,
            mockPlaces.tokyo,
            mockPlaces.marunouchi,
        ],
        placesWithCategories: [],
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
        placesRecommended: null,
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
        placesRecommended: [
            mockPlaces.bookStore,
            mockPlaces.tokyo,
            mockPlaces.marunouchi,
        ],
        buttonLabelUpdatePlace: "入れ替える",
    },
    render: (args) => (
        <Box w="100%" h="800px">
            <DialogRelatedPlaces {...args} updating />
        </Box>
    ),
};
