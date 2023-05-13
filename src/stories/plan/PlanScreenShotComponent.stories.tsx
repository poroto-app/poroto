import {ComponentMeta} from "@storybook/react";
import {PlanScreenShotComponent} from "src/view/plan/PlanScreenShotComponent";

export default {
    title: "plan/PlanScreenShotComponent",
    component: PlanScreenShotComponent
} as ComponentMeta<typeof PlanScreenShotComponent>;

const Template = ({title, planDuration}: { title: string, planDuration: number }) => <PlanScreenShotComponent plan={{
    title,
    id: "plan",
    tags: [],
    timeInMinutes: planDuration,
    places: [
        {
            name: "poroto書店",
            imageUrls: [
                "https://picsum.photos/300/400",
                "https://picsum.photos/1280/720",
                "https://picsum.photos/400/600",
            ],
            tags: []
        },
        {
            name: "スターバックス・コーヒー",
            imageUrls: [
                "https://picsum.photos/300/400",
                "https://picsum.photos/1280/720",
                "https://picsum.photos/400/600",
            ],
            tags: []
        },
    ]
}}/>

export const PlanScreenShotComponentStoryBook = Template.bind({});
PlanScreenShotComponentStoryBook.args = {
    title: "カフェでほっと一息",
    planDurationInMinutes: 120,
    places: [
        {
            name: "poroto書店",
        },
        {
            name: "スターバックス・コーヒー"
        }
    ]
}