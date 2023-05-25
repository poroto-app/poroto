import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MapPinSelector } from "src/view/place/MapPinSelector";
import { useState } from "react";
import { GeoLocation } from "src/domain/models/GeoLocation";

export default {
    title: "place/MapPinSelector",
    component: MapPinSelector,
} as ComponentMeta<typeof MapPinSelector>;

const Template: ComponentStory<typeof MapPinSelector> = (args) => {
    const [location, setLocation] = useState<GeoLocation>();
    return (
        <MapPinSelector
            {...args}
            pinnedLocation={location}
            onSelectLocation={(location) => {
                setLocation(location);
                console.log(location);
            }}
        />
    );
};

export const MapPinSelectorStoryBook = Template.bind({});
MapPinSelectorStoryBook.args = {
    center: { latitude: 35.681236, longitude: 139.767125 },
};
