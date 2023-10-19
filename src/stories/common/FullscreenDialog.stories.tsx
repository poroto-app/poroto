import { FullscreenDialog } from "src/view/common/FullscreenDialog";

import { Box } from "@chakra-ui/react";
import { Meta, StoryObj } from "@storybook/react";
import { RoundedDialog } from "src/view/common/RoundedDialog";

export default {
    title: "common/FullscreenDialog",
    component: FullscreenDialog,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof FullscreenDialog>;

type Story = StoryObj<typeof FullscreenDialog>;

export const Primary: Story = {
    render: (args) => (
        <FullscreenDialog {...args}>
            <RoundedDialog>
                <Box h="100px" />
            </RoundedDialog>
        </FullscreenDialog>
    ),
    args: {
        visible: true,
    },
};
