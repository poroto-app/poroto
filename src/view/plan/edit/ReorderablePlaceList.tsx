import { HStack, VStack } from "@chakra-ui/react";
import {
    closestCenter,
    defaultDropAnimationSideEffects,
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    DropAnimation,
    PointerSensor,
    UniqueIdentifier,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RefObject, useState } from "react";
import { Place } from "src/domain/models/Place";
import { PlaceListItem } from "src/view/plan/edit/PlaceListItem";

type Props = {
    places: Place[];
    onReorderPlaces: (places: Place[]) => void;
    // このコンポーネントを含む親要素のref
    // MEMO: position: fixed; などで親要素の位置が変更されている場合は、
    // dnd-kitが正しく自分の要素の位置を把握できず、ドラッグ中に要素がずれることがある。
    // そのため、親要素の位置を把握することで、ドラッグ中に要素がずれないようにする。
    parentRef?: RefObject<HTMLElement>;
};

export function ReorderablePlaceList({
    places,
    onReorderPlaces,
    parentRef,
}: Props) {
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        setActiveId(null);

        const { active, over } = event;
        if (active.id === over.id) return;

        const oldIndex = places.findIndex((place) => place.id === active.id);
        const newIndex = places.findIndex((place) => place.id === over.id);

        onReorderPlaces(arrayMove(places, oldIndex, newIndex));
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            measuring={{
                draggable: {
                    measure: (node) => {
                        if (!parentRef?.current)
                            return node.getBoundingClientRect();

                        return {
                            ...node.getBoundingClientRect(),
                            x: node.getBoundingClientRect().x,
                            y: node.getBoundingClientRect().y,
                            width: node.getBoundingClientRect().width,
                            height: node.getBoundingClientRect().height,
                            top:
                                node.getBoundingClientRect().top -
                                parentRef.current.getBoundingClientRect().top,
                            left:
                                node.getBoundingClientRect().left -
                                parentRef.current.getBoundingClientRect().left,
                            right: node.getBoundingClientRect().right,
                            bottom: node.getBoundingClientRect().bottom,
                        };
                    },
                },
            }}
        >
            <SortableContext
                items={places}
                strategy={verticalListSortingStrategy}
            >
                <VStack w="100%" spacing={4}>
                    {places.map((place) => (
                        <ReorderblePlaceItem key={place.id} place={place} />
                    ))}
                </VStack>
            </SortableContext>
            {activeId && (
                <ReorderableItemOverlay
                    id={activeId.toString()}
                    place={places.find((place) => place.id === activeId)}
                />
            )}
        </DndContext>
    );
}

function ReorderblePlaceItem({ place }: { place: Place & { id: string } }) {
    const {
        attributes,
        isDragging,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
    } = useSortable({ id: place.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <HStack
            w="100%"
            opacity={isDragging ? 0.3 : 1}
            key={place.name}
            style={style}
            ref={setNodeRef}
        >
            <PlaceListItem
                place={place}
                ref={setActivatorNodeRef}
                draggableAttributes={attributes}
                draggableListeners={listeners}
            />
        </HStack>
    );
}

function ReorderableItemOverlay({ id, place }: { id: string; place: Place }) {
    const dropAnimation: DropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: "0.4",
                },
            },
        }),
    };

    return (
        <DragOverlay dropAnimation={dropAnimation}>
            <ReorderblePlaceItem
                place={{
                    id,
                    ...place,
                }}
            />
        </DragOverlay>
    );
}
