import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PlanThumbnail } from "src/view/plan/PlanThumbnail";

export default {
    title: "plan/PlanThumbnail",
    component: PlanThumbnail,
} as ComponentMeta<typeof PlanThumbnail>;

const Template: ComponentStory<typeof PlanThumbnail> = (args) => (
    <PlanThumbnail {...args} />
);

export const PlanThumbnailStoryBook = Template.bind({});
PlanThumbnailStoryBook.args = {
    imageUrls: [
        "https://picsum.photos/300/400",
        "https://picsum.photos/1280/720",
        "https://picsum.photos/400/600",
        "https://picsum.photos/400/600",
    ],
};
