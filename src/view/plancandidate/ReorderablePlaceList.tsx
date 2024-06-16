import { Button, HStack, Icon, Image, Text, VStack } from "@chakra-ui/react";
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    DraggableAttributes,
    DraggableSyntheticListeners,
    DropAnimation,
    PointerSensor,
    UniqueIdentifier,
    closestCenter,
    defaultDropAnimationSideEffects,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
    SortableContext,
    arrayMove,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { forwardRef, useState } from "react";
import { MdDirectionsWalk, MdDragIndicator } from "react-icons/md";
import { ImageSizes, getImageSizeOf } from "src/domain/models/Image";
import { Place } from "src/domain/models/Place";
import { Transition } from "src/domain/models/Transition";
import {
    DialogPositions,
    FullscreenDialog,
} from "src/view/common/FullscreenDialog";
import { RoundedDialog } from "src/view/common/RoundedDialog";
import { Colors } from "src/view/constants/color";
import { Padding } from "src/view/constants/padding";
import { useAppTranslation } from "src/view/hooks/useAppTranslation";
import { PlaceChipContextAction } from "src/view/plandetail/PlaceChipContextAction";
import styled from "styled-components";

type Props = {
    visible: boolean;
    places: Place[];
    transitions: Transition[];
    onReorderPlaces: (places: Place[]) => void;
    onAutoReorderPlaces: () => void;
    onClose: () => void;
};

export function ReorderablePlaceDialog({
    visible,
    places,
    transitions,
    onReorderPlaces,
    onAutoReorderPlaces,
    onClose,
}: Props) {
    const { t } = useAppTranslation();
    return (
        <FullscreenDialog
            visible={visible}
            onClickOutside={onClose}
            position={DialogPositions.BOTTOM}
        >
            <RoundedDialog>
                <VStack
                    w="100%"
                    spacing={Padding.p16}
                    px={Padding.p8}
                    pb={Padding.p32}
                    pt={Padding.p16}
                >
                    <HStack w="100%">
                        <PlaceChipContextAction
                            label={t(
                                "plan:reorderPlacesMinimizeWalkingDistance"
                            )}
                            icon={MdDirectionsWalk}
                            onClick={onAutoReorderPlaces}
                        />
                    </HStack>
                    <ReorderablePlaceList
                        places={places}
                        transitions={transitions}
                        onReorderPlaces={onReorderPlaces}
                    />
                    <Button
                        w="100%"
                        variant="outline"
                        color={Colors.primary[400]}
                        borderColor={Colors.primary[400]}
                        borderRadius={20}
                        onClick={onClose}
                    >
                        {t("common:close")}
                    </Button>
                </VStack>
            </RoundedDialog>
        </FullscreenDialog>
    );
}

export function ReorderablePlaceList({
    places,
    transitions,
    onReorderPlaces,
}: {
    places: Place[];
    transitions: Transition[];
    onReorderPlaces: (places: Place[]) => void;
}) {
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        setActiveId(null);

        const { active, over } = event;
        if (active.id === over.id) return;

        // TODO: Planner APIで指定されたIDを利用する
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
        >
            <SortableContext
                items={places.map((place) => ({ id: place.id, ...place }))}
                strategy={verticalListSortingStrategy}
            >
                <VStack w="100%" spacing={4}>
                    {places.map((place) => (
                        <ReorderblePlaceItem
                            key={place.id}
                            place={place}
                            transitions={transitions}
                        />
                    ))}
                </VStack>
            </SortableContext>
            {activeId && (
                <ReorderableItemOverlay
                    place={places.find((place) => place.id === activeId)}
                    transitions={transitions}
                />
            )}
        </DndContext>
    );
}

function ReorderblePlaceItem({
    place,
    transitions,
}: {
    place: Place;
    transitions: Transition[];
}) {
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
            key={place.id}
            style={style}
            ref={setNodeRef}
        >
            <PlaceListItem
                place={place}
                transitions={transitions}
                ref={setActivatorNodeRef}
                draggableAttributes={attributes}
                draggableListeners={listeners}
            />
        </HStack>
    );
}

function ReorderableItemOverlay({
    place,
    transitions,
}: {
    place: Place;
    transitions: Transition[];
}) {
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
            <ReorderblePlaceItem place={place} transitions={transitions} />
        </DragOverlay>
    );
}

export const PlaceListItem = forwardRef<
    HTMLDivElement,
    {
        place: Place;
        transitions: Transition[];
        draggableAttributes?: DraggableAttributes;
        draggableListeners?: DraggableSyntheticListeners;
    }
>(function PlaceListItemComponent(
    { place, transitions, draggableAttributes, draggableListeners },
    ref
) {
    const { t } = useAppTranslation();
    const transition = transitions.find((t) => t.toPlaceId === place.id);
    return (
        <HStack
            w="100%"
            spacing={4}
            backgroundColor={Colors.dialog.backgroundColor}
        >
            <HStack flex={1}>
                <Image
                    width={48}
                    height={48}
                    src={
                        place.images.length > 0 &&
                        getImageSizeOf(ImageSizes.Small, place.images[0])
                    }
                    alt="place_thumbnail"
                    style={{
                        objectFit: "cover",
                        overflow: "hidden",
                        borderRadius: 5,
                        width: 48,
                        height: 48,
                    }}
                />
                <VStack h="100%" alignItems="flex-start" spacing="0">
                    <Text lineHeight={1}>{place.name}</Text>
                    {transition && (
                        <Text fontSize="0.9rem" color="rgba(0,0,0,.6)">
                            {transition.fromPlaceId === null
                                ? t(
                                      "plan:reorderPlacesMinuteFromStartLocation",
                                      { minute: transition.durationInMinutes }
                                  )
                                : t(
                                      "plan:reorderPlacesMinuteFromPreviousPlace",
                                      { minute: transition.durationInMinutes }
                                  )}
                        </Text>
                    )}
                </VStack>
            </HStack>
            <DragHandle
                {...draggableAttributes}
                {...draggableListeners}
                ref={ref}
            >
                <Icon w="24px" h="24px" as={MdDragIndicator} color="gray" />
            </DragHandle>
        </HStack>
    );
});

const DragHandle = styled.div`
    // MEMO: touch-action: none とすることで、spで操作するときにスクロールしないようにする
    touch-action: none;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;

    &:focus-visible,
    &:hover {
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.3);
    }
`;
