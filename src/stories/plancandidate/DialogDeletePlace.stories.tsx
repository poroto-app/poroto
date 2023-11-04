import { Meta, StoryObj } from "@storybook/react";
import { mockPlaces } from "src/stories/mock/place";
import { DialogDeletePlace } from "src/view/plancandidate/DialogDeletePlace";

export default {
    title: "plan_candidate/DialogDeletePlace",
    component: DialogDeletePlace,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof DialogDeletePlace>;

type Story = StoryObj<typeof DialogDeletePlace>;

export const Primary: Story = {
    args: {
        placeToDelete: mockPlaces.bookStore,
        isDialogVisible: true,
        isDeleting: false,
    },
};

export const Deleting: Story = {
    args: {
        isDeleting: true,
    },
};
