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
    },
};

export const Failed: Story = {
    args: {
        fetchLocationRequestStatus: RequestStatuses.REJECTED,
    },
};

export const Fulfilled: Story = {
    args: {
        fetchLocationRequestStatus: RequestStatuses.FULFILLED,
    },
};

export const None: Story = {
    args: {
        fetchLocationRequestStatus: null,
    },
};
