import { ComponentMeta, ComponentStory } from "@storybook/react";
import { mockPlan } from "src/stories/mock/plan";
import { PlaceListItem } from "src/view/plan/edit/PlaceListItem";

export default {
    title: "plan/edit/PlaceListItem",
    component: PlaceListItem,
} as ComponentMeta<typeof PlaceListItem>;

const Template: ComponentStory<typeof PlaceListItem> = (args) => (
    <PlaceListItem {...args} />
);

export const PlaceListItemStoryBook = Template.bind({});
PlaceListItemStoryBook.args = {
    place: mockPlan.places[0],
};
