import { Meta, StoryObj } from "@storybook/react";

function TestComponent() {
    return <div>Test</div>;
}

export default {
    title: "ad/Test",
    component: TestComponent,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof TestComponent>;

type Story = StoryObj<typeof TestComponent>;

export const Primary: Story = {};
