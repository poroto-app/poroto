import {ComponentMeta, ComponentStory} from "@storybook/react";
import {PlanInterestPageComponent} from "src/pages/plans/interest";
import {NavBarComponent} from "src/view/common/NavBar";
import {LocationCategory} from "src/domain/models/LocationCategory";

export default {
    title: "interest/PlanInterestPageComponent",
    component: PlanInterestPageComponent
} as ComponentMeta<typeof PlanInterestPageComponent>;

const Template = ({category}: {category: LocationCategory}) => <PlanInterestPageComponent
    currentCategory={category}
    handleYes={() => 0}
    handleNo={() => 0}
    navBar={<NavBarComponent canBack={true} onBack={() => 0} title="今の気分を教えてください"/>}
/>

export const PlanInterestPageComponentStoryBook = Template.bind({});
PlanInterestPageComponentStoryBook.args = {
    category: {
        name: "cafe",
        displayName: "カフェ",
        thumbnail: "https://picsum.photos/1280/720",
    } as LocationCategory
}
