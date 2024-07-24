import { Meta, StoryObj } from "@storybook/react";
import { LocationPermissions } from "src/hooks/useLocation";
import { LocationUnavailable } from "src/view/top/LocationUnavailable";

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
