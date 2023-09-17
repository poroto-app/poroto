import { ComponentMeta } from "@storybook/react";
import { PlanPreview } from "src/view/plan/PlanPreview";

export default {
    title: "plan/PlanPreview",
    component: PlanPreview,
} as ComponentMeta<typeof PlanPreview>;

const Template = ({
    title,
    timeInMinutes,
}: {
    title: string;
    timeInMinutes: number;
}) => (
    <PlanPreview
        plan={{
            id: "plan",
            title,
            timeInMinutes,
            tags: [],
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
                    tags: ["書店", "駅チカ", "品揃え"],
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
                        "https://picsum.photos/1280/720",
                        "https://picsum.photos/400/600",
                    ],
                    thumbnailUrls: [
                        "https://picsum.photos/300/400",
                        "https://picsum.photos/1280/720",
                        "https://picsum.photos/400/600",
                        "https://picsum.photos/400/600",
                        "https://picsum.photos/300/400",
                        "https://picsum.photos/1280/720",
                        "https://picsum.photos/400/600",
                    ],
                    estimatedStayDuration: 30,
                },
                {
                    id: "place2",
                    googlePlaceId: "googlePlaceId",
                    name: "スターバックスコーヒー",
                    tags: ["カフェ", "駅チカ", "コーヒー"],
                    location: {
                        latitude: 35.681236,
                        longitude: 139.767125,
                    },
                    imageUrls: [
                        "https://picsum.photos/1280/720",
                        "https://picsum.photos/300/400",
                        "https://picsum.photos/400/600",
                    ],
                    thumbnailUrls: [
                        "https://picsum.photos/300/400",
                        "https://picsum.photos/1280/720",
                        "https://picsum.photos/400/600",
                    ],
                    estimatedStayDuration: 30,
                },
            ],
            author: null,
        }}
    />
);

export const PlanPreviewStoryBook = Template.bind({});
PlanPreviewStoryBook.args = {
    title: "プランタイトル",
    timeInMinutes: 30,
};
