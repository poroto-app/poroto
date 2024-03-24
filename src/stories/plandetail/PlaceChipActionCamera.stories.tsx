import { Meta, StoryObj } from "@storybook/react";
import { PlaceChipActionCamera } from "src/view/plandetail/PlaceChipContextAction";

export default {
    title: "plan_detail/PlaceChipActionCamera",
    component: PlaceChipActionCamera,
    tags: ["autodocs"],
    parameters: {},
} as Meta<typeof PlaceChipActionCamera>;

type Story = StoryObj<typeof PlaceChipActionCamera>;

export const Primary: Story = {
    args: {
        placeId: "",
        localFiles: [],
        isUploading: false,
        isUploadPlacePhotoDialogVisible: false,
        onFileChanged: (f) => 0,
        onUpload: () => 0,
        onCloseDialog: () => 0,
    },
};

export const Selected: Story = {
    args: {
        placeId: "",
        localFiles: [],
        isUploading: false,
        isUploadPlacePhotoDialogVisible: true,
        onFileChanged: (f) => 0,
        onUpload: () => 0,
        onCloseDialog: () => 0,
    },
};

export const Uploading: Story = {
    args: {
        placeId: "",
        localFiles: [],
        isUploading: true,
        isUploadPlacePhotoDialogVisible: true,
        onFileChanged: (f) => 0,
        onUpload: () => 0,
        onCloseDialog: () => 0,
    },
};
