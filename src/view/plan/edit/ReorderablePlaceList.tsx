import { HStack, VStack } from "@chakra-ui/react";
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    UniqueIdentifier,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { Place } from "src/domain/models/Place";
import { PlaceListItem } from "src/view/plan/edit/PlaceListItem";

type Props = {
    places: Place[];
    onReorderPlaces: (places: Place[]) => void;
};

export function ReorderablePlaceList({ places, onReorderPlaces }: Props) {
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        setActiveId(null);

        const { active, over } = event;
        if (active.id === over.id) return;

        // TODO: Planner APIで指定されたIDを利用する
        const oldIndex = places.findIndex((place) => place.name === active.id);
        const newIndex = places.findIndex((place) => place.name === over.id);

        onReorderPlaces(arrayMove(places, oldIndex, newIndex));
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            {/*TODO: Planner APIに場所のIDを指定させる*/}
            <SortableContext
                items={places.map((place) => ({ id: place.name, ...place }))}
                strategy={verticalListSortingStrategy}
            >
                <VStack w="100%" px="16px" spacing={4}>
                    {places.map((place) => (
                        <ReorderblePlaceItem
                            key={place.name}
                            isActive={activeId === place.name}
                            place={{ ...place, id: place.name }}
                        />
                    ))}
                </VStack>
            </SortableContext>
            <DragOverlay>
                {activeId && (
                    <PlaceListItem
                        place={places.find((place) => place.name === activeId)}
                    />
                )}
            </DragOverlay>
        </DndContext>
    );
}

function ReorderblePlaceItem({
    place,
    isActive,
}: {
    place: Place & { id: string };
    isActive: boolean;
}) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: place.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <HStack
            w="100%"
            opacity={isActive ? 0.3 : 1}
            key={place.name}
            ref={setNodeRef}
            style={style}
        >
            <PlaceListItem
                place={place}
                draggableAttributes={attributes}
                draggableListeners={listeners}
            />
        </HStack>
    );
}
