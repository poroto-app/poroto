import { Meta, StoryObj } from "@storybook/react";
import { mockPlaces } from "src/stories/mock/place";
import { CreatePlanDialog } from "src/view/plandetail/CreatePlanDialog";

export default {
    title: "plan_detail/CreatePlanDialog",
    component: CreatePlanDialog,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} as Meta<typeof CreatePlanDialog>;

type Story = StoryObj<typeof CreatePlanDialog>;

export const Primary: Story = {
    args: {
        place: mockPlaces.bookStore,
    },
};
