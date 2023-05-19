import {ComponentMeta, ComponentStory} from "@storybook/react";
import {PlaceSearchBar} from "src/view/place/PlaceSearchBar";
import {Box} from "@chakra-ui/react";

export default {
    title: "place/PlaceSearchBar",
    component: PlaceSearchBar
} as ComponentMeta<typeof PlaceSearchBar>;

const Template: ComponentStory<typeof PlaceSearchBar> = (args) => <Box w="100%" maxW="900px">
    <PlaceSearchBar onSearch={(v) => console.log("Search:", v)}/>
</Box>

export const PlaceSearchBarStoryBook = Template.bind({});
PlaceSearchBarStoryBook.args = {}
