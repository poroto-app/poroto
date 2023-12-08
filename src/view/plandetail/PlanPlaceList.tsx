import {
    Box,
    Center,
    Divider,
    HStack,
    Icon,
    Text,
    VStack,
} from "@chakra-ui/react";
import { MdAdd, MdOutlineDirectionsWalk } from "react-icons/md";
import { Place } from "src/domain/models/Place";
import { Plan } from "src/domain/models/Plan";
import { Transition } from "src/domain/models/Transition";
import { DateHelper } from "src/domain/util/date";
import { Colors } from "src/view/constants/color";
import { PlacePreview } from "src/view/plandetail/PlacePreview";

type Props = {
    plan: Plan;
    createdBasedOnCurrentLocation?: boolean;
    onClickAddPlace?: (props: { previousPlaceId: string }) => void;
    onClickShowRelatedPlaces?: (placeId: string) => void;
    onClickDeletePlace?: (placeId: string) => void;

    /**
     * プランを開始する時間
     * 滞在する時間を表示するために利用される
     */
    startTime?: Date;
};

export function PlanPlaceList({
    plan,
    createdBasedOnCurrentLocation,
    startTime = new Date(Date.now()),
    onClickAddPlace,
    onClickShowRelatedPlaces,
    onClickDeletePlace,
}: Props) {
    const schedules = generateSchedules({ places: plan.places, startTime });

    return (
        <VStack spacing="0" w="100%">
            {createdBasedOnCurrentLocation && (
                <PlacePreview
                    name="現在地"
                    images={[]}
                    categories={[]}
                    googlePlaceReviews={[]}
                    priceRange={null}
                    estimatedStayDuration={0}
                />
            )}
            {plan.places.map((place, i) => (
                <VStack key={i} w="100%" spacing={0}>
                    <ScheduleListItem time={schedules[i].startTime} />
                    <PlaceListItem
                        place={place}
                        onClickAddPlace={onClickAddPlace}
                        onClickShowRelatedPlaces={onClickShowRelatedPlaces}
                        onClickDeletePlace={onClickDeletePlace}
                    />
                    <ScheduleListItem time={schedules[i].endTime} />
                    <ListItemWalk
                        transition={plan.transitions.find(
                            (t) => t.fromPlaceId == place.id
                        )}
                    />
                </VStack>
            ))}
        </VStack>
    );
}

const PlaceListItem = ({
    place,
    onClickAddPlace,
    onClickShowRelatedPlaces,
    onClickDeletePlace,
}: {
    place: Place;
    onClickAddPlace?: (props: { previousPlaceId: string }) => void;
    onClickShowRelatedPlaces?: (placeId: string) => void;
    onClickDeletePlace?: (placeId: string) => void;
}) => {
    return (
        <VStack spacing="16px" w="100%" pl="24px" position="relative">
            <PlacePreview
                name={place.name}
                images={place.images}
                googlePlaceReviews={place.googlePlaceReviews}
                categories={place.categories}
                priceRange={place.priceRange}
                estimatedStayDuration={place.estimatedStayDuration}
                onClickShowRelatedPlaces={
                    onClickShowRelatedPlaces
                        ? () => onClickShowRelatedPlaces(place.id)
                        : undefined
                }
                onClickDeletePlace={
                    onClickDeletePlace
                        ? () => onClickDeletePlace(place.id)
                        : undefined
                }
            />
            {onClickAddPlace && (
                <Center
                    as="button"
                    color="#BD9F8E"
                    border="1.5px solid #BD9F8E"
                    borderRadius="20px"
                    w="100%"
                    py="4px"
                    onClick={() =>
                        onClickAddPlace({
                            previousPlaceId: place.id,
                        })
                    }
                >
                    <Icon as={MdAdd} />
                </Center>
            )}
            {/* スケジュールを表すバー */}
            <Box
                w="8px"
                backgroundColor="#ECCEAC"
                position="absolute"
                top="-16px"
                bottom="-16px"
                left="4px"
            />
        </VStack>
    );
};

function generateSchedules({
    places,
    startTime,
}: {
    places: Place[];
    startTime: Date;
}): {
    startTime: Date;
    endTime: Date;
}[] {
    const schedules = [];
    for (const place of places) {
        const endTime = DateHelper.add(
            startTime,
            place.estimatedStayDuration * 60 * 1000
        );
        schedules.push({ startTime, endTime });

        // TODO: 移動時間を考慮する
        startTime = endTime;
    }
    return schedules;
}

const ScheduleListItem = ({ time }: { time: Date }) => {
    return (
        <HStack w="100%" spacing={4}>
            <Box
                w="16px"
                h="16px"
                border="4px solid transparent"
                borderRadius="50% "
                outline="4px solid #ecceac"
                backgroundColor="white"
                zIndex={1}
            />
            <Text fontWeight="bold" fontSize="16px">
                {DateHelper.dateToHHMM(time)}
            </Text>
        </HStack>
    );
};

const ListItemWalk = ({ transition }: { transition: Transition }) => {
    if (!transition) return <></>;

    return (
        <HStack w="100%" position="relative">
            <Divider
                position="absolute"
                left="8px"
                top="0"
                bottom="0"
                orientation="vertical"
                borderColor="rgba(0,0,0,.3)"
                borderStyle="dashed"
            />
            <HStack w="100%" py="12px" pl="20px">
                <Icon
                    as={MdOutlineDirectionsWalk}
                    w="20px"
                    h="20px"
                    color={Colors.beige["400"]}
                />
                <VStack alignItems="flex-start" spacing={0}>
                    <Text>{transition.durationInMinutes}分</Text>
                </VStack>
            </HStack>
        </HStack>
    );
};
