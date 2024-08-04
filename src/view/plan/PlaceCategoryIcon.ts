import { IconProps } from "@tamagui/helpers-icon";
import {
    Bird,
    BookOpen,
    Coffee,
    FerrisWheel,
    Landmark,
    Library,
    MapPin,
    Sandwich,
    ShoppingBag,
    Tent,
    TreeDeciduous,
    Utensils,
} from "@tamagui/lucide-icons";
import { NamedExoticComponent } from "react";
import {
    PlaceCategory,
    PlaceCategoryTypes,
} from "src/domain/models/PlaceCategory";

const icons: {
    [key in
        | (typeof PlaceCategoryTypes)[keyof typeof PlaceCategoryTypes]
        | "null"]: NamedExoticComponent<IconProps>;
} = {
    [PlaceCategoryTypes.Amusements]: FerrisWheel,
    [PlaceCategoryTypes.BookStores]: BookOpen,
    [PlaceCategoryTypes.Cafe]: Coffee,
    [PlaceCategoryTypes.Camp]: Tent,
    [PlaceCategoryTypes.Culture]: Landmark,
    [PlaceCategoryTypes.Natural]: Bird,
    [PlaceCategoryTypes.Park]: TreeDeciduous,
    [PlaceCategoryTypes.Restaurant]: Utensils,
    [PlaceCategoryTypes.Library]: Library,
    [PlaceCategoryTypes.MealTakeaway]: Sandwich,
    [PlaceCategoryTypes.Shopping]: ShoppingBag,
};

export const getPlaceCategoryIcon = (
    category: PlaceCategory | null
): NamedExoticComponent<IconProps> => {
    const defaultIcon = MapPin;
    if (category === null) return defaultIcon;
    if (Object.keys(icons).includes(category.id)) return icons[category.id];
    return defaultIcon;
};
