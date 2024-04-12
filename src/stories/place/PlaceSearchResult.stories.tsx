import { Meta, StoryFn } from "@storybook/react";
import { PlaceSearchResults } from "src/view/place/PlaceSearchResults";

export default {
    title: "place/PlaceSearchResults",
    component: PlaceSearchResults,
} as Meta<typeof PlaceSearchResults>;

const Template: StoryFn<typeof PlaceSearchResults> = (args) => (
    <PlaceSearchResults {...args} />
);

export const PlaceSearchResultsStoryBook = Template.bind({});
PlaceSearchResultsStoryBook.args = {
    places: [
        {
            id: "1",
            name: "町田駅",
            address: "日本、東京都町田市原町田６丁目１２ 町田駅",
        },
        {
            id: "2",
            name: "町田駅前郵便局",
            address: "日本、東京都町田市原町田４丁目１−１４ 町田駅前郵便局",
        },
        {
            id: "3",
            name: "町田駅前通り",
            address: "日本、東京都町田市原町田２丁目１ 町田駅前通り",
        },
    ],
};
