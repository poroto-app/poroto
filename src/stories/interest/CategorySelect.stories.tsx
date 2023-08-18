import { Box } from "@chakra-ui/react";
import { CategorySelect } from "src/view/interest/CategorySelect";

export default {
    title: "interest/CategorySelect",
    component: CategorySelect,
};

const Template = ({ category, thumbnail, defaultThumbnailUrl }) => (
    <Box w="100%" h="100%" p={8}>
        <CategorySelect
            category={{
                name: "category",
                displayName: category,
                thumbnail,
                defaultThumbnailUrl,
            }}
            onClickYes={() => 0}
            onClickNo={() => 0}
        />
    </Box>
);

export const Primary = Template.bind({});
Primary.args = {
    category: "温泉",
    thumbnail:
        "https://images.pexels.com/photos/347137/pexels-photo-347137.jpeg",
    defaultThumbnailUrl:
        "https://storage.googleapis.com/planner-public-asset-bucket/undraw_a_day_at_the_park_re_9kxj.svg",
};

export const DefaultCategoryImage = Template.bind({});
DefaultCategoryImage.args = {
    category: "温泉",
    defaultThumbnailUrl:
        "https://storage.googleapis.com/planner-public-asset-bucket/undraw_a_day_at_the_park_re_9kxj.svg",
};
