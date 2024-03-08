import { Box } from "@chakra-ui/react";
import { Meta, StoryObj } from "@storybook/react";
import { mockPlaces } from "src/stories/mock/place";
import { Size } from "src/view/constants/size";
import { PlanHeaderPlaceCard } from "src/view/plandetail/header/PlanHeaderPlaceCard";

export default {
    title: "plan_detail/PlanHeaderPlaceCard",
    component: PlanHeaderPlaceCard,
    tags: ["autodocs"],
} as Meta<typeof PlanHeaderPlaceCard>;

type Story = StoryObj<typeof PlanHeaderPlaceCard>;

export const Primary: Story = {
    args: {
        place: mockPlaces.bookStore,
        likeCount: 10,
        isLiked: true,
        onUpdateLike: () => 0,
    },
    parameters: {
        decorators: [
            (Story: any) => (
                <Box
                    w={Size.PlanDetailHeader.maxW}
                    h={Size.PlanDetailHeader.imageH}
                >
                    <Story />
                </Box>
            ),
        ],
    },
};

export const LongName: Story = {
    args: {
        place: {
            ...mockPlaces.bookStore,
            name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        likeCount: 0,
        isLiked: false,
        onUpdateLike: () => 0,
    },
    parameters: {
        decorators: [
            (Story: any) => (
                <Box
                    w={Size.PlanDetailHeader.maxW}
                    h={Size.PlanDetailHeader.imageH}
                >
                    <Story />
                </Box>
            ),
        ],
    },
};
