import { Box } from "@chakra-ui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { mockPlan } from "src/stories/mock/plan";
import { SearchRouteByGoogleMapButton } from "src/view/plan/button/SearchRouteByGoogleMapButton";

export default {
    title: "plan/button/SearchRouteByGoogleMapButton",
    component: SearchRouteByGoogleMapButton,
} as ComponentMeta<typeof SearchRouteByGoogleMapButton>;

const Template: ComponentStory<typeof SearchRouteByGoogleMapButton> = (
    args
) => (
    <Box w="400px">
        <SearchRouteByGoogleMapButton {...args} />
    </Box>
);

export const SearchRouterByGoogleMapButtonStoryBook = Template.bind({});
SearchRouterByGoogleMapButtonStoryBook.args = {
    plan: mockPlan,
    currentLocation: {
        latitude: 35.6809591,
        longitude: 139.7673068,
    },
    createdBasedOnCurrentLocation: true,
};
