import { IconType } from "react-icons";
import {
    MdOutlineAttractions,
    MdOutlineCottage,
    MdOutlineImportContacts,
    MdOutlineLocalCafe,
    MdOutlineLocalLibrary,
    MdOutlineLocationOn,
    MdOutlineMuseum,
    MdOutlinePark,
    MdOutlinePets,
    MdOutlineRestaurant,
    MdOutlineShoppingBag,
    MdOutlineTakeoutDining,
} from "react-icons/md";
import {
    PlaceCategory,
    PlaceCategoryTypes,
} from "src/domain/models/PlaceCategory";

const icons: {
    [key in
        | (typeof PlaceCategoryTypes)[keyof typeof PlaceCategoryTypes]
        | "null"]: IconType;
} = {
    [PlaceCategoryTypes.Amusements]: MdOutlineAttractions,
    [PlaceCategoryTypes.BookStores]: MdOutlineImportContacts,
    [PlaceCategoryTypes.Cafe]: MdOutlineLocalCafe,
    [PlaceCategoryTypes.Camp]: MdOutlineCottage,
    [PlaceCategoryTypes.Culture]: MdOutlineMuseum,
    [PlaceCategoryTypes.Natural]: MdOutlinePets,
    [PlaceCategoryTypes.Park]: MdOutlinePark,
    [PlaceCategoryTypes.Restaurant]: MdOutlineRestaurant,
    [PlaceCategoryTypes.Library]: MdOutlineLocalLibrary,
    [PlaceCategoryTypes.MealTakeaway]: MdOutlineTakeoutDining,
    [PlaceCategoryTypes.Shopping]: MdOutlineShoppingBag,
};

export const getPlaceCategoryIcon = (
    category: PlaceCategory | null
): IconType => {
    const defaultIcon = MdOutlineLocationOn;
    if (category === null) return defaultIcon;
    if (Object.keys(icons).includes(category.id)) return icons[category.id];
    return defaultIcon;
};
