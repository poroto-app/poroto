import { Box } from "@chakra-ui/react";
import { Meta, StoryObj } from "@storybook/react";
import { ShowPlaceRecommendationButton } from "src/view/place/ShowPlaceRecommendationButton";

export default {
    title: "place/ShowPlaceRecommendationButton",
    component: ShowPlaceRecommendationButton,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof ShowPlaceRecommendationButton>;

type Story = StoryObj<typeof ShowPlaceRecommendationButton>;

export const Primary: Story = {
    render: (args) => (
        <Box>
            <ShowPlaceRecommendationButton {...args} />,
        </Box>
    ),
};
