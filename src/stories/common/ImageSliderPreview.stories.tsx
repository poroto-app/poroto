import { Box } from "@chakra-ui/react";
import { Meta, StoryObj } from "@storybook/react";
import { mockPlaces } from "src/stories/mock/place";
import { ImageSliderPreview } from "src/view/common/ImageSliderPreview";

export default {
    title: "common/ImageSliderPreview",
    component: ImageSliderPreview,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof ImageSliderPreview>;

type Story = StoryObj<typeof ImageSliderPreview>;

export const Primary: Story = {
    args: {
        images: mockPlaces["bookStore"].images,
    },
    render: (args) => (
        <Box w="400px" h="400px">
            <ImageSliderPreview {...args} />
        </Box>
    ),
};

export const Smartphone: Story = {
    args: {
        images: mockPlaces["bookStore"].images,
    },
    parameters: {
        viewport: {
            defaultViewport: "iphonex",
        },
    },
    render: (args) => (
        <Box w="100%" maxW="400px" h="400px">
            <ImageSliderPreview {...args} />
        </Box>
    ),
};

export const NotDraggable: Story = {
    args: {
        images: mockPlaces["bookStore"].images,
        draggable: false,
    },
    parameters: {
        viewport: {
            defaultViewport: "iphonex",
        },
    },
    render: (args) => (
        <Box w="100%" maxW="400px" h="400px">
            <ImageSliderPreview {...args} />
        </Box>
    ),
};
