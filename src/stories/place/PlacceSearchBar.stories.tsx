import { Box } from "@chakra-ui/react";
import { Meta, StoryFn } from "@storybook/react";
import { PlaceSearchBar } from "src/view/place/PlaceSearchBar";

export default {
    title: "place/PlaceSearchBar",
    component: PlaceSearchBar,
} as Meta<typeof PlaceSearchBar>;

const Template: StoryFn<typeof PlaceSearchBar> = (args) => (
    <Box w="100%" maxW="900px">
        <PlaceSearchBar onSearch={(v) => console.log("Search:", v)} />
    </Box>
);

export const PlaceSearchBarStoryBook = Template.bind({});
PlaceSearchBarStoryBook.args = {};
