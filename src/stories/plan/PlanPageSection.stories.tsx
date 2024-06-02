import { Skeleton } from "@chakra-ui/react";
import { Meta, StoryObj } from "@storybook/react";
import { MdHome } from "react-icons/md";
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

export const WithDescription: Story = {
    args: {
        title: "Title",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        children: <Skeleton w="100%" h="100px" />,
    },
};

export const Icon: Story = {
    args: {
        title: "Title",
        icon: MdHome,
        children: <Skeleton w="100%" h="100px" />,
    },
};
