import { Meta, StoryFn } from "@storybook/react";
import { LoadingModal } from "src/view/common/LoadingModal";

export default {
    title: "common/LoadingModal",
    component: LoadingModal,
} as Meta<typeof LoadingModal>;

const Template: StoryFn<typeof LoadingModal> = (args) => (
    <LoadingModal title={args.title} />
);

export const LoadingModalStoryBook = Template.bind({});
LoadingModalStoryBook.args = {
    title: "読み込み中",
};

export const LoadingModalWithLongMessage = Template.bind({});
LoadingModalWithLongMessage.args = {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent interdum odio nulla, at molestie lectus ornare sed. Phasellus at nibh ipsum. Integer vestibulum felis id risus consequat, sed consectetur ipsum ultricies. Quisque sem sem, facilisis non ornare in, interdum in urna. In dignissim ut massa sed iaculis. Vivamus commodo velit nunc, nec iaculis mi mollis nec. Morbi elementum arcu sit amet metus malesuada, a dictum lorem tincidunt. Nulla facilisi. Nullam convallis feugiat urna eget facilisis. Sed pharetra eu urna eu pharetra. Vestibulum lacinia varius nisi, eu elementum nulla fermentum eget. Vestibulum in purus pellentesque, dictum tortor sed, malesuada sem.",
};
