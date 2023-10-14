import { Box } from "@chakra-ui/react";
import { Meta, StoryObj } from "@storybook/react";
import { mockPlaces } from "src/stories/mock/place";
import { StoryImagePreview } from "src/view/plan/StoryImagePreview";

export default {
    title: "plan/StoryImagePreview",
    component: StoryImagePreview,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof StoryImagePreview>;

type Story = StoryObj<typeof StoryImagePreview>;

export const Primary: Story = {
    args: {
        images: mockPlaces.bookStore.images,
    },
    render: (args) => (
        <Box w="300px" h="400px">
            <StoryImagePreview {...args} />
        </Box>
    ),
};

export const NoImage: Story = {
    args: {
        images: [],
    },
    render: (args) => (
        <Box w="300px" h="400px">
            <StoryImagePreview {...args} />
        </Box>
    ),
}

export const DisableTapControl: Story = {
    args: {
        images: mockPlaces.bookStore.images,
        tapControl: false,
    },
    render: (args) => (
        <Box w="300px" h="400px">
            <StoryImagePreview {...args} />
        </Box>
    ),
}

export const DisableSlide: Story = {
    args: {
        images: mockPlaces.bookStore.images,
        slideable: false,
    },
    render: (args) => (
        <Box w="300px" h="400px">
            <StoryImagePreview {...args} />
        </Box>
    ),
}