import { PlaceCategory } from "src/domain/models/PlaceCategory";
import { getPlaceCategoryIcon } from "src/view/plan/PlaceCategoryIcon";

export function PlaceCategoryIcon({
    category,
    size = 24,
    color = "black",
}: {
    category: PlaceCategory | null;
    size?: number;
    color?: string;
}) {
    const Icon = getPlaceCategoryIcon(category);
    return <Icon size={size} color={color} />;
}
