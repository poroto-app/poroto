import { Meta, StoryObj } from "@storybook/react";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { BindPreLoginStateConfirmationDialog } from "src/view/plandetail/BindPreLoginStateConfirmationDialog";

export default {
    title: "plan_detail/BindPreLoginStateConfirmationDialog",
    component: BindPreLoginStateConfirmationDialog,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof BindPreLoginStateConfirmationDialog>;

type Story = StoryObj<typeof BindPreLoginStateConfirmationDialog>;

export const Primary: Story = {
    args: {
        visible: true,
        bindingRequestStatus: undefined,
    },
};

export const Binding: Story = {
    args: {
        visible: true,
        bindingRequestStatus: RequestStatuses.PENDING,
        onClose: () => alert("onClose"),
    },
};

export const Success: Story = {
    args: {
        visible: true,
        bindingRequestStatus: RequestStatuses.FULFILLED,
    },
};

export const Error: Story = {
    args: {
        visible: true,
        bindingRequestStatus: RequestStatuses.REJECTED,
    },
};
