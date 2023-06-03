import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PlacePreview } from "src/view/plan/PlacePreview";

export default {
    title: "plan/PlacePreview",
    component: PlacePreview,
} as ComponentMeta<typeof PlacePreview>;

const Template: ComponentStory<typeof PlacePreview> = (args) => (
    <PlacePreview {...args} />
);

export const PlacePreviewStoryBook = Template.bind({});
PlacePreviewStoryBook.args = {
    name: "poroto書店",
    tags: ["書店", "駅チカ", "品揃え"],
    imageUrls: [
        "https://picsum.photos/300/400",
        "https://picsum.photos/1280/720",
        "https://picsum.photos/400/600",
        "https://picsum.photos/400/600",
        "https://picsum.photos/300/400",
        "https://picsum.photos/1280/720",
        "https://picsum.photos/400/600",
    ],
};

export const Loading = Template.bind({});
Loading.args = {
    name: "poroto書店",
    tags: ["書店", "駅チカ", "品揃え"],
    imageUrls: [
        "https://example.com/photo/a",
        "https://example.com/photo/b",
        "https://example.com/photo/c",
        "https://example.com/photo/d",
        "https://example.com/photo/e",
    ],
};

export const EmptyImages = Template.bind({});
EmptyImages.args = {
    name: "poroto書店",
    tags: ["書店", "駅チカ", "品揃え"],
    imageUrls: [],
};
