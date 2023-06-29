import { Box } from "@chakra-ui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { FullscreenDialog } from "src/view/common/FullscreenDialog";
import { RoundedDialog } from "src/view/common/RoundedDialog";

export default {
    title: "common/FullscreenDialog",
    component: FullscreenDialog,
} as ComponentMeta<typeof FullscreenDialog>;

const Template: ComponentStory<typeof FullscreenDialog> = (args) => (
    <FullscreenDialog onClickOutside={() => alert("clicked outside")}>
        <RoundedDialog>
            <Box h="100px" />
        </RoundedDialog>
    </FullscreenDialog>
);

export const FullscreenDialogStoryBook = Template.bind({});
FullscreenDialogStoryBook.args = {};
