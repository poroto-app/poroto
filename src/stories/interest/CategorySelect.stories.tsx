import { CategorySelect } from "src/view/interest/CategorySelect";
import { Box } from "@chakra-ui/react";

export default {
    title: "interest/CategorySelect",
    component: CategorySelect,
};

const Template = ({ category, thumbnail }) => (
    <Box maxW="500px" w="100%" p={8}>
        <CategorySelect
            category={{ name: "category", displayName: category, thumbnail }}
            onClickYes={() => 0}
            onClickNo={() => 0}
        />
    </Box>
);

export const CategorySelectStoryBook = Template.bind({});
CategorySelectStoryBook.args = {
    category: "温泉",
    thumbnail:
        "https://images.pexels.com/photos/347137/pexels-photo-347137.jpeg",
};
