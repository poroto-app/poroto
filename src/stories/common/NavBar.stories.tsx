import {ComponentMeta, ComponentStory} from "@storybook/react";
import {NavBarComponent} from "src/view/common/NavBar";
import {Box} from "@chakra-ui/react";

export default {
    title: "common/NavBar",
    component: NavBarComponent,
} as ComponentMeta<typeof NavBarComponent>;

const Template: ComponentStory<typeof NavBarComponent> = (args) => <Box w="100%">
    <NavBarComponent title={args.title} canBack={args.canBack} onBack={() => 0}/>
</Box>

export const NavBarStoryBook = Template.bind({});
NavBarStoryBook.args = {
    title: "Navigation Bar Title",
    canBack: true,
}
