import {ComponentMeta, ComponentStory} from "@storybook/react";
import {NavBar} from "src/view/common/NavBar";
import {Box} from "@chakra-ui/react";

export default {
    title: "common/NavBar",
    component: NavBar,
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = (args) => <Box w="100%">
    <NavBar title={args.title}/>
</Box>

export const NavBarStoryBook = Template.bind({});
NavBarStoryBook.args = {
    title: "Navigation Bar Title"
}
