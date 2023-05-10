import {ComponentMeta, ComponentStory} from "@storybook/react";
import {PlaceMap} from "src/view/plan/PlaceMap";
import {Place} from "src/domain/models/Place";

export default {
    title: "plan/PlaceMap",
    component: PlaceMap
} as ComponentMeta<typeof PlaceMap>;

const Template: ComponentStory<typeof PlaceMap> = (args) => <PlaceMap {...args}/>

export const PlaceMapStoryBook = Template.bind({});
PlaceMapStoryBook.args = {
    places: [
        {
            name: "東京駅",
            imageUrls: [],
            location: {
                latitude: 35.6809591,
                longitude: 139.7673068,
            }
        },
        {
            name: "東京駅丸の内駅前広場",
            imageUrls: [],
            location: {
                latitude: 35.681616,
                longitude: 139.764954,
            },
        }
    ] as Place[]
}

const EmptyTemplate = () => <PlaceMap places={[]}/>
export const Empty = EmptyTemplate.bind({})