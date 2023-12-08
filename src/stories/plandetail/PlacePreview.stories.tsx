import { Meta, StoryObj } from "@storybook/react";
import { PlaceCategoryTypes } from "src/domain/models/PlaceCategory";
import { mockPlaces } from "src/stories/mock/place";
import { PlacePreview } from "src/view/plandetail/PlacePreview";

export default {
    title: "plan_detail/PlacePreview",
    component: PlacePreview,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PlacePreview>;

type Story = StoryObj<typeof PlacePreview>;

export const Primary: Story = {
    args: {
        ...mockPlaces.bookStore,
    },
};

export const Sp: Story = {
    args: {
        ...mockPlaces.bookStore,
    },
    parameters: {
        viewport: {
            defaultViewport: "iphonex",
        },
    },
};

export const CurrentLocation: Story = {
    args: {
        name: "現在地",
        categories: [],
        googlePlaceReviews: [],
        images: [],
        priceRange: null,
    },
};

export const Loading: Story = {
    args: {
        ...mockPlaces.bookStore,
        images: [
            "https://example.com/photo/a",
            "https://example.com/photo/b",
            "https://example.com/photo/c",
            "https://example.com/photo/d",
        ].map((url) => ({
            isGoogleImage: false,
            default: url,
            small: url,
            large: url,
        })),
    },
};

export const EmptyImages: Story = {
    args: {
        ...mockPlaces.bookStore,
        images: [],
        categories: [],
    },
};

export const EmptyTags: Story = {
    args: {
        ...mockPlaces.bookStore,
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
                    displayName: "カテゴリー",
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
        ...mockPlaces.bookStore,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        category: PlaceCategoryTypes.BookStore,
    },
};

export const LongReview: Story = {
    args: {
        ...mockPlaces.bookStore,
        googlePlaceReviews: [
            {
                rating: 5,
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies ultrices, nunc nisl ultricies nunc, vitae ultricies nisl nisl vitae nisl. Donec euismod, nisl eget ultricies ultrices, nunc nisl ultricies nunc, vitae ultricies nisl nisl vitae nisl. Donec euismod, nisl eget ultricies ultrices, nunc nisl ultricies nunc, vitae ultricies nisl nisl vitae nisl. Donec euismod, nisl eget ultricies ultrices, nunc nisl ultricies nunc, vitae ultricies nisl nisl vitae nisl. Donec euismod, nisl eget ultricies ultrices, nunc nisl ultricies nunc, vitae ultricies nisl nisl vitae nisl. Donec euismod, nisl eget ultricies ultrices, nunc nisl ultricies nunc, vitae ultricies nisl nisl vitae nisl. Donec euismod, nisl eget ultricies ultrices, nunc nisl ultricies nunc, vitae ultricies nisl nisl vitae nisl.",
                authorName: "authorName",
                authorUrl: "authorUrl",
                authorPhotoUrl: "authorPhotoUrl",
                timeInMilliSec: 0,
            },
            ...mockPlaces.bookStore.googlePlaceReviews,
        ],
    },
};
