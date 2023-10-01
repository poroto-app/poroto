import { Meta, StoryObj } from "@storybook/react";
import { MessageCard } from "src/view/plan/MessageCard";

export default {
    title: "plan/MessageCard",
    component: MessageCard,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof MessageCard>;

type Story = StoryObj<typeof MessageCard>;

export const Primary: Story = {
    args: {
        message: "どんな場所に行きたいですか？",
    },
};
