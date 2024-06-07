import { Skeleton } from "@chakra-ui/react";
import { Meta, StoryObj } from "@storybook/react";
import { MdHome } from "react-icons/md";
import { SectionTitle } from "src/view/common/SectionTitle";
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
        sectionHeader: <SectionTitle title="Section Title" />,
        children: <Skeleton w="100%" h="100px" />,
    },
};

export const WithDescription: Story = {
    args: {
        sectionHeader: (
            <SectionTitle title="Section Title" description="Description" />
        ),
        children: <Skeleton w="100%" h="100px" />,
    },
};

export const Icon: Story = {
    args: {
        sectionHeader: <SectionTitle title="Section Title" icon={MdHome} />,
        children: <Skeleton w="100%" h="100px" />,
    },
};
