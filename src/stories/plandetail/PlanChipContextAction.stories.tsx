import { Meta, StoryObj } from "@storybook/react";
import {PlaceChipContextAction} from "src/view/plandetail/PlaceChipContextAction";
import {MdOutlineDeleteOutline} from "react-icons/md";

export default {
    title: "plan_detail/PlaceChipContextAction",
    component: PlaceChipContextAction,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PlaceChipContextAction>;

type Story = StoryObj<typeof PlaceChipContextAction>;

export const Primary: Story = {
    args: {
        label: "削除",
        icon: MdOutlineDeleteOutline,
        onClick: () => 0,
    },
};
