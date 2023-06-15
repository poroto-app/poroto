import { ComponentMeta } from "@storybook/react";
import { LocationCategory } from "src/domain/models/LocationCategory";
import { PlanInterestPageComponent } from "src/pages/plans/interest";
import { NavBarComponent } from "src/view/common/NavBar";

export default {
    title: "interest/PlanInterestPageComponent",
    component: PlanInterestPageComponent,
} as ComponentMeta<typeof PlanInterestPageComponent>;

const Template = ({ category }: { category: LocationCategory }) => (
    <PlanInterestPageComponent
        currentCategory={category}
        handleAcceptCategory={() => 0}
        handleRejectCategory={() => 0}
        onSelectTime={(time) => console.log(time)}
        navBar={
            <NavBarComponent
                canBack={true}
                onBack={() => 0}
                title="今の気分を教えてください"
            />
        }
    />
);

export const PlanInterestPageComponentStoryBook = Template.bind({});
PlanInterestPageComponentStoryBook.args = {
    category: {
        name: "cafe",
        displayName: "カフェ",
        thumbnail: "https://picsum.photos/1280/720",
    } as LocationCategory,
};
