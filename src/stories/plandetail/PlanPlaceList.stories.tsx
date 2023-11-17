import { ComponentMeta, ComponentStory } from "@storybook/react";
import { mockPlan } from "src/stories/mock/plan";
import { PlanPlaceList } from "src/view/plandetail/PlanPlaceList";

export default {
    title: "plan_detail/PlanPlaceList",
    component: PlanPlaceList,
} as ComponentMeta<typeof PlanPlaceList>;

const Template: ComponentStory<typeof PlanPlaceList> = (args) => (
    <PlanPlaceList {...args} />
);

export const PlanPlaceListStoryBook = Template.bind({});
PlanPlaceListStoryBook.args = {
    plan: mockPlan,
    createdBasedOnCurrentLocation: true,
};
