import {ComponentMeta, ComponentStory} from "@storybook/react";
import {NavBar} from "src/view/common/NavBar";

export default {
    title: "common/NavBar",
    component: NavBar,
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = (args) => <NavBar title={args.title}/>

export const NavBarStoryBook = Template.bind({});
NavBarStoryBook.args = {
    title: "Navigation Bar Title"
}
