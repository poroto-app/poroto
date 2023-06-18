import {Box, VStack} from "@chakra-ui/react";
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor, TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates, useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import { Place } from "src/domain/models/Place";
import { PlaceListItem } from "src/view/plan/edit/PlaceListItem";

type Props = {
    places: Place[];
    onReorderPlaces: (places: Place[]) => void;
};

export function ReorderablePlaceList({ places, onReorderPlaces }: Props) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
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
            onDragEnd={handleDragEnd}
        >
            {/*TODO: Planner APIに場所のIDを指定させる*/}
            <SortableContext
                items={places.map((place) => ({ id: place.name, ...place }))}
                strategy={verticalListSortingStrategy}
            >
                <VStack w="100%">
                    {places.map((place) => (
                        <Box w="100%" px="16px" py="8px" key={place.name}>
                            <ReorderblePlaceItem place={({...place, id: place.name})} />
                        </Box>
                    ))}
                </VStack>
            </SortableContext>
        </DndContext>
    );
}

function ReorderblePlaceItem({ place }: { place: Place & { id : string} }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: place.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return <Box w="100%" ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <PlaceListItem place={place} />
    </Box>
}