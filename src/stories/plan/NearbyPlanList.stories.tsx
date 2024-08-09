import { Meta, StoryObj } from "@storybook/react";
import { mockPlans } from "src/stories/mock/plan";
import { LocationPermissions } from "src/types/hooks";
import { NearbyPlanList } from "src/view/plan/NearbyPlanList";

export default {
    title: "plan/NearbyPlanList",
    component: NearbyPlanList,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof NearbyPlanList>;

type Story = StoryObj<typeof NearbyPlanList>;

export const Primary: Story = {
    args: {
        plans: [mockPlans.cafe, mockPlans.bookStore, mockPlans.tokyo],
        locationPermission: LocationPermissions.GRANTED,
        isFetchingNearbyPlans: false,
        isFetchingCurrentLocation: false,
    },
};

export const Empty: Story = {
    args: {
        plans: [],
        locationPermission: LocationPermissions.GRANTED,
        isFetchingNearbyPlans: false,
        isFetchingCurrentLocation: false,
        onRequestFetchNearByPlans: () => 0,
    },
};

export const Loading: Story = {
    args: {
        plans: null,
        locationPermission: LocationPermissions.GRANTED,
        isFetchingNearbyPlans: true,
        isFetchingCurrentLocation: false,
        onRequestFetchNearByPlans: () => 0,
    },
};

export const LocationPending: Story = {
    args: {
        plans: null,
        locationPermission: LocationPermissions.PROMPT,
        isFetchingNearbyPlans: false,
        isFetchingCurrentLocation: false,
        onRequestFetchNearByPlans: () => 0,
    },
};

export const FetchingCurrentLocation: Story = {
    args: {
        plans: null,
        locationPermission: LocationPermissions.GRANTED,
        isFetchingNearbyPlans: false,
        isFetchingCurrentLocation: true,
        onRequestFetchNearByPlans: () => 0,
    },
};

export const LocationUnavailable: Story = {
    args: {
        plans: null,
        locationPermission: LocationPermissions.DENIED,
        isFetchingNearbyPlans: false,
        isFetchingCurrentLocation: false,
        onRequestFetchNearByPlans: () => 0,
    },
};
