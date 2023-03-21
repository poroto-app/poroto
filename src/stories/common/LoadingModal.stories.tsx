import {ComponentMeta, ComponentStory} from "@storybook/react";
import {LoadingModal} from "src/view/common/LoadingModal";

export default {
    title: "common/LoadingModal",
    component: LoadingModal
} as ComponentMeta<typeof LoadingModal>;

const Template: ComponentStory<typeof LoadingModal> = (args) => <LoadingModal title={args.title}/>

export const LoadingModalStoryBook = Template.bind({});
LoadingModalStoryBook.args = {
    title: "読み込み中"
}
