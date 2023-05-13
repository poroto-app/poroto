import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PlanScreenShotComponent } from "src/view/plan/PlanScreenShotComponent"

export default {
    title: "plan/PlanScreenShotComponent",
    component: PlanScreenShotComponent
} as ComponentMeta<typeof PlanScreenShotComponent>;

const Template: ComponentStory<typeof PlanScreenShotComponent> = (args) => <PlanScreenShotComponent {...args} />

export const PlanScreenShotComponentStoryBook = Template.bind({});
PlanScreenShotComponentStoryBook.args = {
    name: "有隣堂",
    address: "〒2430018 神奈川県厚木市中町2丁目6 三世ほてい屋第一ビル",
    distance: "300m",
    time: "徒歩 5分",
    money: {
        start: 500,
        end: 1000
    },
    totalTime: 20,
}