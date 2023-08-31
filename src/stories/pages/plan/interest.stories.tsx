import { Meta, StoryObj } from "@storybook/react";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { PlanInterestPageComponent } from "src/pages/plans/interest";

export default {
    title: "interest/PlanInterestPageComponent",
    component: PlanInterestPageComponent,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PlanInterestPageComponent>;

type Story = StoryObj<typeof PlanInterestPageComponent>;

export const Primary: Story = {
    args: {
        currentCategory: {
            name: "cafe",
            displayName: "カフェ",
            thumbnail: "https://picsum.photos/1280/720",
            defaultThumbnailUrl: "https://picsum.photos/1280/720",
        },
        matchInterestRequestStatus: RequestStatuses.FULFILLED,
    },
};
