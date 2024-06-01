import { Meta, StoryObj } from "@storybook/react";
import { mockPlans } from "src/stories/mock/plan";
import { UsersPlan } from "src/view/account/UsersPlan";

export default {
    title: "top/UsersPlan",
    component: UsersPlan,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof UsersPlan>;

type Story = StoryObj<typeof UsersPlan>;

export const Primary: Story = {
    args: {
        plans: [mockPlans.cafe, mockPlans.bookStore, mockPlans.tokyo],
        isLoading: false,
    },
};

export const Empty: Story = {
    args: {
        plans: [],
        isLoading: false,
    },
};

export const EmptySp: Story = {
    args: {
        plans: [],
        isLoading: false,
    },
    parameters: {
        viewport: {
            defaultViewport: "iphonex",
        },
    },
};

export const Loading: Story = {
    args: {
        plans: null,
        isLoading: true,
    },
};

export const NonAuthUser: Story = {
    args: {
        plans: null,
        isLoading: false,
    },
};

export const Transition: Story = {
    args: {
        isLoading: false,
        plans: null,
    },
};
