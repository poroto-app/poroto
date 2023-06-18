import { Box } from "@chakra-ui/react";
import { Identifier, XYCoord } from "dnd-core";
import { useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Place } from "src/domain/models/Place";
import { PlaceListItem } from "src/view/plan/edit/PlaceListItem";

type Props = {
    places: Place[];
    onReorderPlaces: (places: Place[]) => void;
};

type DragItem = {
    index: number;
    id: string;
    type: string;
};

const PlaceListItemType = "PlaceListItem";

export function ReorderablePlaceList({ places, onReorderPlaces }: Props) {
    const moveCard = (dragIndex: number, hoverIndex: number) => {
        const dragCard = places[dragIndex];
        const newPlaces = [...places];
        newPlaces.splice(dragIndex, 1);
        newPlaces.splice(hoverIndex, 0, dragCard);
        onReorderPlaces(newPlaces);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <Box>
                {places.map((place, i) => (
                    <Box px="16px" py="8px" key={place.name}>
                        <ReorderablePlaceListItem
                            place={place}
                            index={i}
                            /* TODO: Planner APIにIDを指定させる */
                            moveCard={moveCard}
                        />
                    </Box>
                ))}
            </Box>
        </DndProvider>
    );
}

// SEE: https://react-dnd.github.io/react-dnd/examples/sortable/simple
export function ReorderablePlaceListItem({
    place,
    index,
    moveCard,
}: {
    place: Place;
    index: number;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const [{ handlerId }, drop] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: PlaceListItemType,
        collect: (monitor) => {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY =
                (clientOffset as XYCoord).y - hoverBoundingRect.top;

            // 下方向にドラッグしている
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            // 上方向にドラッグしている
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveCard(dragIndex, hoverIndex);

            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: PlaceListItemType,
        item: () => {
            // TODO: Planner APIにIDを指定させる
            return { id: place.name, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.5 : 1;
    drag(drop(ref));

    return (
        <Box ref={ref} opacity={opacity} data-handler-id={handlerId}>
            <PlaceListItem place={place} />
        </Box>
    );
}
