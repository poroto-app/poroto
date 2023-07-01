import { Skeleton } from "@chakra-ui/react";
import { Meta, StoryObj } from "@storybook/react";
import { PlanPageSection } from "src/view/plan/section/PlanPageSection";

export default {
    title: "plan/PlanPageSection",
    component: PlanPageSection,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PlanPageSection>;

type Story = StoryObj<typeof PlanPageSection>;

export const Primary: Story = {
    args: {
        title: "タイトル",
        children: <Skeleton w="100%" h="100px" />,
    },
};

export const Accordion: Story = {
    args: {
        title: "タイトル",
        accordion: true,
        children: <Skeleton w="100%" h="100px" />,
    },
};
