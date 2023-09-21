import { Meta, StoryObj } from "@storybook/react";
import { PlanPreview } from "src/view/plan/PlanPreview";

export default {
    title: "plan/PlanPreview",
    component: PlanPreview,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PlanPreview>;

type Story = StoryObj<typeof PlanPreview>;

export const Primary: Story = {
    args: {
        plan: {
            id: "plan",
            title: "プランタイトル",
            timeInMinutes: 30,
            author: null,
            transitions: [
                {
                    fromPlaceId: "place1",
                    toPlaceId: "place2",
                    durationInMinutes: 10,
                },
            ],
            places: [
                {
                    id: "place1",
                    googlePlaceId: "googlePlaceId",
                    name: "poroto書店",
                    location: {
                        latitude: 35.681236,
                        longitude: 139.767125,
                    },
                    imageUrls: [
                        "https://picsum.photos/300/400",
                        "https://picsum.photos/1280/720",
                        "https://picsum.photos/400/600",
                        "https://picsum.photos/400/600",
                        "https://picsum.photos/300/400",
                    ],
                    estimatedStayDuration: 30,
                },
                {
                    id: "place2",
                    googlePlaceId: "googlePlaceId",
                    name: "スターバックスコーヒー",
                    location: {
                        latitude: 35.681236,
                        longitude: 139.767125,
                    },
                    imageUrls: [
                        "https://picsum.photos/1280/720",
                        "https://picsum.photos/300/400",
                        "https://picsum.photos/400/600",
                    ],
                    estimatedStayDuration: 30,
                },
            ],
        },
    },
};

export const PlaceHolder: Story = {
    args: {
        plan: null,
    },
};
