import { Meta, StoryObj } from "@storybook/react";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { FetchLocationDialog } from "src/view/location/FetchLocationDialog";

export default {
    title: "location/FetchLocationDialog",
    component: FetchLocationDialog,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof FetchLocationDialog>;

type Story = StoryObj<typeof FetchLocationDialog>;

export const Fetching: Story = {
    args: {
        fetchLocationRequestStatus: RequestStatuses.PENDING,
        onRetry: () => 0,
    },
};

export const Failed: Story = {
    args: {
        fetchLocationRequestStatus: RequestStatuses.REJECTED,
        onRetry: () => 0,
    },
};

export const Fulfilled: Story = {
    args: {
        fetchLocationRequestStatus: RequestStatuses.FULFILLED,
        onRetry: () => 0,
    },
};

export const None: Story = {
    args: {
        fetchLocationRequestStatus: null,
        onRetry: () => 0,
    },
};
