import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";
import { copyObject } from "src/domain/util/object";
import { mockPlan } from "src/stories/mock/plan";
import { ReorderablePlaceList } from "src/view/plan/edit/ReorderablePlaceList";

export default {
    title: "plan/edit/ReorderablePlaceList",
    component: ReorderablePlaceList,
} as ComponentMeta<typeof ReorderablePlaceList>;

const Template: ComponentStory<typeof ReorderablePlaceList> = ({
    places: placesOriginal,
}) => {
    const [places, setPlaces] = useState(placesOriginal);

    return (
        <ReorderablePlaceList
            places={places}
            onReorderPlaces={(places) => setPlaces(copyObject(places))}
        />
    );
};

export const ReorderablePlaceListStoryBook = Template.bind({});
ReorderablePlaceListStoryBook.args = {
    places: mockPlan.places,
};
