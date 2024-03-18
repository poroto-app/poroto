import { Meta, StoryObj } from "@storybook/react";
import { LocationUnavailable } from "src/view/top/LocationUnavailable";
import {LocationPermissions} from "src/view/hooks/useLocation";

export default {
    title: "top/LocationUnavailable",
    component: LocationUnavailable,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof LocationUnavailable>;

type Story = StoryObj<typeof LocationUnavailable>;

export const Primary: Story = {
    args: {
        isUpdating: false,
        locationPermission: LocationPermissions.DENIED,
        onClickSwitch: () => {
            console.log("onClickSwitch");
        },
    },
};
