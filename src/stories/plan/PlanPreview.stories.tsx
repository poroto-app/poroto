import { Meta, StoryObj } from "@storybook/react";
import { mockPlaces } from "src/stories/mock/place";
import { PlanPreview } from "src/view/plan/PlanPreview";

export default {
    title: "plan/PlanPreview",
    component: PlanPreview,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PlanPreview>;

type Story = StoryObj<typeof PlanPreview>;

export const Primary: Story = {
    args: {
        plan: {
            id: "plan",
            title: "プランタイトル",
            timeInMinutes: 30,
            author: {
                id: "author",
                name: "Taro Yamada",
                avatarImage: "https://picsum.photos/450/600",
            },
            transitions: [
                {
                    fromPlaceId: mockPlaces.bookStore.id,
                    toPlaceId: mockPlaces.tokyo.id,
                    durationInMinutes: 10,
                },
            ],
            places: [mockPlaces.bookStore, mockPlaces.tokyo],
        },
    },
};

export const WoAuthor: Story = {
    args: {
        plan: {
            id: "plan",
            title: "プランタイトル",
            timeInMinutes: 30,
            author: null,
            transitions: [
                {
                    fromPlaceId: mockPlaces.bookStore.id,
                    toPlaceId: mockPlaces.tokyo.id,
                    durationInMinutes: 10,
                },
            ],
            places: [mockPlaces.bookStore, mockPlaces.tokyo],
        },
    },
}

export const LongName: Story = {
    args: {
        plan: {
            id: "plan",
            title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
            timeInMinutes: 30,
            author: {
                id: "author",
                name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
                avatarImage: "https://picsum.photos/450/600",
            },
            transitions: [
                {
                    fromPlaceId: mockPlaces.bookStore.id,
                    toPlaceId: mockPlaces.tokyo.id,
                    durationInMinutes: 10,
                },
            ],
            places: [mockPlaces.bookStore, mockPlaces.tokyo],
        },
    },
}

export const PlaceHolder: Story = {
    args: {
        plan: null,
    },
};
