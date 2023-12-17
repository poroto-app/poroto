import { Meta, StoryObj } from "@storybook/react";
import {
    PlaceChipActionDelete,
    PlaceChipActionShowRelatedPlaces,
    PlaceChipContextAction
} from "src/view/plandetail/PlaceChipContextAction";
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

export const Delete: Story = {
    render: (args) => <PlaceChipActionDelete {...args} />,
}

export const ShowRelatedPlaces: Story = {
    render: (args) => <PlaceChipActionShowRelatedPlaces {...args} />,
}