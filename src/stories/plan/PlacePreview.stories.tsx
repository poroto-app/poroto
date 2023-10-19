import { Meta, StoryObj } from "@storybook/react";
import { PlaceCategoryTypes } from "src/domain/models/PlaceCategory";
import { mockPlaces } from "src/stories/mock/place";
import { PlacePreview } from "src/view/plan/PlacePreview";

export default {
    title: "plan/PlacePreview",
    component: PlacePreview,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PlacePreview>;

type Story = StoryObj<typeof PlacePreview>;

export const Primary: Story = {
    args: {
        name: mockPlaces.bookStore.name,
        images: mockPlaces.bookStore.images,
        googlePlaceReviews: mockPlaces.bookStore.googlePlaceReviews,
        categories: mockPlaces.bookStore.categories,
    },
};

export const Sp: Story = {
    args: {
        name: mockPlaces.bookStore.name,
        images: mockPlaces.bookStore.images,
        googlePlaceReviews: mockPlaces.bookStore.googlePlaceReviews,
        categories: mockPlaces.bookStore.categories,
    },
    parameters: {
        viewport: {
            defaultViewport: "iphonex",
        },
    },
};

export const Loading: Story = {
    args: {
        name: mockPlaces.bookStore.name,
        images: [
            "https://example.com/photo/a",
            "https://example.com/photo/b",
            "https://example.com/photo/c",
            "https://example.com/photo/d",
        ].map((url) => ({
            default: url,
            small: url,
            large: url,
        })),
        categories: [],
    },
};

export const EmptyImages: Story = {
    args: {
        name: mockPlaces.bookStore.name,
        images: [],
        categories: [],
    },
};

export const EmptyTags: Story = {
    args: {
        name: mockPlaces.bookStore.name,
        images: mockPlaces.bookStore.images,
        categories: [],
    },
};

export const Category: Story = {
    render: (args) => (
        <PlacePreview
            {...args}
            categories={[
                {
                    id: args["category"],
                },
            ]}
        />
    ),
    argTypes: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        category: {
            control: "select",
            options: [null, ...Object.values(PlaceCategoryTypes)],
        },
    },
    args: {
        name: mockPlaces.bookStore.name,
        images: mockPlaces.bookStore.images,
        categories: [],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        category: PlaceCategoryTypes.BookStore,
    },
};
