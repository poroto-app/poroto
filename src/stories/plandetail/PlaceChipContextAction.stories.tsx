import { Meta, StoryObj } from "@storybook/react";
import { Trash } from "@tamagui/lucide-icons";
import {
    PlaceChipActionDelete,
    PlaceChipActionGoogleMaps,
    PlaceChipActionInstagram,
    PlaceChipActionShowRelatedPlaces,
    PlaceChipContextAction,
} from "src/view/plandetail/PlaceChipContextAction";

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
        icon: Trash,
        onClick: () => 0,
    },
};

export const Delete: Story = {
    render: (args) => <PlaceChipActionDelete onClick={() => 0} {...args} />,
};

export const ShowRelatedPlaces: Story = {
    render: (args) => (
        <PlaceChipActionShowRelatedPlaces onClick={() => 0} {...args} />
    ),
};

export const Instagram: Story = {
    render: () => <PlaceChipActionInstagram placeName="東京駅" />,
};

export const GoogleMaps: Story = {
    render: () => (
        <PlaceChipActionGoogleMaps
            placeName="東京駅"
            googlePlaceId="ChIJC3Cf2PuLGGAROO00ukl8JwA"
        />
    ),
};
