import { Meta, StoryObj } from "@storybook/react";
import {ImageWithSkeleton} from "src/view/common/ImageWithSkeleton";
import {Box} from "@chakra-ui/react";

export default {
    title: "common/ImageWithSkeleton",
    component: ImageWithSkeleton,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof ImageWithSkeleton>;

type Story = StoryObj<typeof ImageWithSkeleton>;

export const Primary: Story = {
    args: {
        src: "https://placehold.jp/150x150.png",
    },
    render: (args) => <Box w="300px" h="100px">
        <ImageWithSkeleton {...args} />
    </Box>
};

export const Loading: Story = {
    args: {
        src: "https://dammy.example.com/150x150.png",
    },
    render: (args) => <Box w="300px" h="100px">
        <ImageWithSkeleton {...args} />
    </Box>
}
