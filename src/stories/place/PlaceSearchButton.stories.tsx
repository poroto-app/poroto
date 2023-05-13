import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import {PlaceSearchButton} from "src/view/place/PlaceSearchButton";
import {Box} from "@chakra-ui/react";

export default {
    title: "place/PlaceSearchButton",
    component: PlaceSearchButton
} as ComponentMeta<typeof PlaceSearchButton>;

const Template: ComponentStory<typeof PlaceSearchButton> = () => <Box w="100%" maxW="900px">
    <PlaceSearchButton/>
</Box>

export const PlaceSearchButtonStoryBook = Template.bind({});
PlaceSearchButtonStoryBook.args = {}
