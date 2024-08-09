import { Meta, StoryObj } from "@storybook/react";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { mockPlaces } from "src/stories/mock/place";
import { PlanInterestPageComponent } from "src/view/interest/PlanCreateInterestPage";

export default {
    title: "interest/PlanInterestPageComponent",
    component: PlanInterestPageComponent,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} as Meta<typeof PlanInterestPageComponent>;

type Story = StoryObj<typeof PlanInterestPageComponent>;

export const Primary: Story = {
    args: {
        currentCategory: {
            name: "cafe",
            displayName: "カフェ",
            defaultThumbnailUrl: "https://picsum.photos/1280/720",
            places: Object.values(mockPlaces),
        },
        matchInterestRequestStatus: RequestStatuses.FULFILLED,
    },
};

export const CategorySelect: Story = {
    args: {
        currentCategory: {
            name: "cafe",
            displayName: "カフェ",
            defaultThumbnailUrl: "https://picsum.photos/1280/720",
            places: Object.values(mockPlaces),
        },
        matchInterestRequestStatus: RequestStatuses.FULFILLED,
    },
};

export const CategorySelectSettingCategory: Story = {
    args: {
        categoryCandidates: [
            {
                name: "cafe",
                displayName: "カフェ",
                defaultThumbnailUrl: "https://picsum.photos/1280/720",
                places: Object.values(mockPlaces),
            },
        ],
        currentCategory: null,
        matchInterestRequestStatus: RequestStatuses.FULFILLED,
    },
};
