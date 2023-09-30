import { Box } from "@chakra-ui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Plan } from "src/domain/models/Plan";
import { PlanScreenShotComponent } from "src/view/plan/PlanScreenShotComponent";

export default {
    title: "plan/PlanScreenShotComponent",
    component: PlanScreenShotComponent,
} as ComponentMeta<typeof PlanScreenShotComponent>;

const Template: ComponentStory<typeof PlanScreenShotComponent> = (args) => (
    <Box w="100%">
        <PlanScreenShotComponent {...args} />
    </Box>
);

export const PlanScreenShotComponentStoryBook = Template.bind({});
PlanScreenShotComponentStoryBook.args = {
    plan: {
        id: "1",
        title: "カフェでほっと一息",
        timeInMinutes: 60,
        places: [
            {
                name: "東京駅",
                location: {
                    latitude: 35.6809591,
                    longitude: 139.7673068,
                },
            },
            {
                name: "東京駅丸の内駅前広場",
                location: {
                    latitude: 35.681616,
                    longitude: 139.764954,
                },
            },
        ],
    } as Plan,
    money: {
        start: 500,
        end: 1000,
    },
};
