import { Place } from "src/domain/models/Place";
import { createArrayWithSize } from "src/domain/util/array";
import { HorizontalScrollableList } from "src/view/common/HorizontalScrollableList";
import { PlaceCard } from "src/view/place/PlaceCard";

type Props = {
    places: Place[] | null;
    px?: string | number;
    onSelectPlace?: (place: Place) => void;
};

export const NearbyPlaceList = ({ places, px, onSelectPlace }: Props) => {
    if (!places) {
        return (
            <HorizontalScrollableList px={px}>
                {createArrayWithSize(5).map((_, index) => (
                    <PlaceCard place={null} key={index} />
                ))}
            </HorizontalScrollableList>
        );
    }

    // TODO: 要素が一つもないときの対応
    return (
        <HorizontalScrollableList px={px}>
            {places
                .filter((p) => p.images.length > 0)
                .map((place, index) => (
                    <PlaceCard
                        key={index}
                        place={place}
                        onClick={() => onSelectPlace?.(place)}
                    />
                ))}
        </HorizontalScrollableList>
    );
};
