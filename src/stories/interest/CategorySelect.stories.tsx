import {CategorySelect} from "src/view/interest/CategorySelect";

export default {
    title: "interest/CategorySelect",
    component: CategorySelect,
};

const Template = ({category}: { category: string }) => <CategorySelect
    category={{name: category}}
    onClickYes={() => 0}
    onClickNo={() => 0}
/>

export const CategorySelectStoryBook = Template.bind({});
CategorySelectStoryBook.args = {
    category: "温泉"
}
