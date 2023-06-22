import { Box } from "@chakra-ui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { PlanActionButton } from "src/view/plan/button/PlanActionButton";

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
    center,
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
            center={center}
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

export const Center = Template.bind({});
Center.args = {
    text: "保存",
    color: "#539565",
    center: true,
};
