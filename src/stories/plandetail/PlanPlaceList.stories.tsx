import { mockPlan } from "src/stories/mock/plan";
import { PlanPlaceList } from "src/view/plandetail/PlanPlaceList";

import { Meta, StoryObj } from "@storybook/react";

export default {
    title: "plan_detail/PlanPlaceList",
    component: PlanPlaceList,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PlanPlaceList>;

type Story = StoryObj<typeof PlanPlaceList>;

export const Primary: Story = {
    args: {
        plan: mockPlan,
        createdBasedOnCurrentLocation: true,
        likePlaceIds: [],
    },
};
