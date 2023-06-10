import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PlanActionButton } from "src/view/plan/button/PlanActionButton";
import { MdOutlinePhotoCamera } from "react-icons/md";
import React from "react";
import { Box } from "@chakra-ui/react";

export default {
    title: "plan/button/PlanActionButton",
    component: PlanActionButton,
} as ComponentMeta<typeof PlanActionButton>;

const Template: ComponentStory<typeof PlanActionButton> = ({
    text,
    color,
    imageUrl,
    filled,
    borderRadius,
}) => (
    <Box w="300px">
        <PlanActionButton
            onClick={() => 0}
            text={text}
            icon={!imageUrl && MdOutlinePhotoCamera}
            imageUrl={imageUrl}
            color={color}
            filled={filled}
            borderRadius={borderRadius}
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

export const Filled = Template.bind({});
Filled.args = {
    text: "保存",
    color: "#539565",
    filled: true,
};

export const Rounded = Template.bind({});
Rounded.args = {
    text: "保存",
    color: "#539565",
    borderRadius: 10,
};
