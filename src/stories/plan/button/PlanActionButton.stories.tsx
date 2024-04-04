import { Box } from "@chakra-ui/react";
import { Meta, StoryFn } from "@storybook/react";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { PlanActionButton } from "src/view/plan/button/PlanActionButton";

export default {
    title: "plan/button/PlanActionButton",
    component: PlanActionButton,
} as Meta<typeof PlanActionButton>;

const Template: StoryFn<typeof PlanActionButton> = ({ text, imageUrl }) => (
    <Box w="300px">
        <PlanActionButton
            onClick={() => 0}
            text={text}
            icon={!imageUrl && MdOutlinePhotoCamera}
            imageUrl={imageUrl}
        />
    </Box>
);

export const Icon = Template.bind({});
Icon.args = {
    text: "保存",
    color: "#539565",
};

export const Image = Template.bind({});
Image.args = {
    text: "保存",
    color: "#539565",
    imageUrl:
        "https://developers.google.com/static/maps/images/maps-icon.svg?hl=ja",
};
