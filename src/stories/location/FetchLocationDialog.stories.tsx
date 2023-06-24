import { ComponentMeta, ComponentStory } from "@storybook/react";
import { FetchLocationDialog } from "src/view/location/FetchLocationDialog";

export default {
    title: "location/FetchLocationDialog",
    component: FetchLocationDialog,
} as ComponentMeta<typeof FetchLocationDialog>;

const Template: ComponentStory<typeof FetchLocationDialog> = (args) => (
    <FetchLocationDialog
        onFetchLocation={() => 0}
        isLoadingLocation={args.isLoadingLocation}
        isRejected={args.isRejected}
        getCurrentLocation={() => Promise.resolve({latitude: 0, longitude: 0})}
    />
);

export const FetchLocationDialogStoryBook = Template.bind({});
FetchLocationDialogStoryBook.args = {
    isLoadingLocation: true,
    isRejected: false,
};

export const Fetching = Template.bind({
    isLoadingLocation: true,
    isRejected: false,
});

export const Rejected = Template.bind({});
Rejected.args = {
    isLoadingLocation: false,
    isRejected: true,
};
