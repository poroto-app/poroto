import { Meta, StoryObj } from "@storybook/react";
import { LoginCallMessage } from "src/view/plandetail/LoginCallMessage";

export default {
    title: "plan_detail/LoginCallMessage",
    component: LoginCallMessage,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof LoginCallMessage>;

type Story = StoryObj<typeof LoginCallMessage>;

export const Primary: Story = {};
