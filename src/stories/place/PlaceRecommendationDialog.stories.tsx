import { Meta, StoryObj } from "@storybook/react";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { mockPlaces } from "src/stories/mock/place";
import { PlaceRecommendationDialog } from "src/view/place/PlaceRecommendationDialog";

export default {
    title: "place/PlaceRecommendationDialog",
    component: PlaceRecommendationDialog,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PlaceRecommendationDialog>;

type Story = StoryObj<typeof PlaceRecommendationDialog>;

export const Primary: Story = {
    args: {
        visible: true,
        places: [
            mockPlaces.bookStore,
            mockPlaces.tokyo,
            mockPlaces.marunouchi,
            mockPlaces.restaurant,
        ],
    },
};

export const Sp: Story = {
    args: {
        visible: true,
        places: [
            mockPlaces.bookStore,
            mockPlaces.tokyo,
            mockPlaces.marunouchi,
            mockPlaces.restaurant,
        ],
    },
    parameters: {
        viewport: {
            defaultViewport: "iphonex",
        },
    },
};

export const Fetching: Story = {
    args: {
        visible: true,
        places: null,
        status: RequestStatuses.PENDING,
    },
};

export const Null: Story = {
    args: {
        visible: true,
        places: null,
    },
};

export const Empty: Story = {
    args: {
        visible: true,
        places: [],
    },
};

export const Error: Story = {
    args: {
        visible: true,
        places: null,
        status: RequestStatuses.REJECTED,
        onRetry: () => console.log("retry"),
    },
};
