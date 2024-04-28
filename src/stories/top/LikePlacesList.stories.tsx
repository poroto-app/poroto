import { Meta, StoryObj } from "@storybook/react";
import { mockPlaces } from "src/stories/mock/place";
import { LikePlacesList } from "src/view/top/LikePlacesList";

export default {
    title: "top/LikePlacesList",
    component: LikePlacesList,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof LikePlacesList>;

type Story = StoryObj<typeof LikePlacesList>;

export const Primary: Story = {
    args: {
        places: [
            mockPlaces.bookStore,
            mockPlaces.marunouchi,
            mockPlaces.tokyo,
            mockPlaces.restaurant,
        ],
    },
};

export const Empty: Story = {
    args: {
        places: [],
    },
};

export const NoPlaces: Story = {
    args: {
        places: null,
    },
};

export const Transition: Story = {
    render: (args) => {
        return <LikePlacesList places={args["isEmpty"] ? [] : args.places} />;
    },
    args: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        isEmpty: false,
        places: [mockPlaces.bookStore],
    },
};
