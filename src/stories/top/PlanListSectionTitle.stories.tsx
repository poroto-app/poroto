import { Meta, StoryObj } from "@storybook/react";
import {
    PlanListSectionTitle,
    PlanSections,
} from "src/view/top/PlanListSectionTitle";

export default {
    title: "top/PlanListSectionTitle",
    component: PlanListSectionTitle,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PlanListSectionTitle>;

type Story = StoryObj<typeof PlanListSectionTitle>;

export const NearBy: Story = {
    args: {
        section: PlanSections.NearBy,
    },
};

export const Recent: Story = {
    args: {
        section: PlanSections.Recent,
    },
};
