import {ComponentMeta, ComponentStory} from "@storybook/react";
import {MapViewer, MapViewerProps} from "src/view/common/MapViewer";

export default {
    title: "common/MapViewer",
    component: MapViewer
} as ComponentMeta<typeof MapViewer>;

const Template = (args) => <MapViewer
    {...args}
/>

export const MapViewerStoryBook = Template.bind({});
MapViewerStoryBook.args = {
    zoom: 15,
    center: {lat: 35.681236, lng: 139.767125},
} as MapViewerProps
