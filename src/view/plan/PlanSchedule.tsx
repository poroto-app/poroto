import {
    Box,
    Center,
    Divider,
    HStack,
    Icon,
    Text,
    VStack,
} from "@chakra-ui/react";
import { MdOutlineDirectionsWalk, MdOutlineLocationOn } from "react-icons/md";
import { Place } from "src/domain/models/Place";
import { Plan } from "src/domain/models/Plan";
import { Transition } from "src/domain/models/Transition";
import { DateHelper } from "src/domain/util/date";
import { Colors } from "src/view/constants/color";
import { PlanPlaceList } from "src/view/plandetail/PlanPlaceList";
import styled from "styled-components";

export type Props = {
    plan: Plan;
    /**
     * プランを開始する時間
     * 滞在する時間を表示するために利用される
     */
    startTime?: Date;
    /**
     * 現在地からプランを開始するかどうか
     * trueの場合、スケジュールの最初に現在地と表示される
     */
    startFromCurrentLocation?: boolean;
};

export function PlanSchedule({
    plan,
    startFromCurrentLocation = false,
    startTime = new Date(Date.now()),
}: Props) {
    const schedules = generateSchedules({ places: plan.places, startTime });
    const transitionFromCurrentLocation = plan.transitions.find(
        (t) => !t.fromPlaceId
    );

    return (
        <VStack alignItems="flex-start" w="100%" spacing="16px">
            {startFromCurrentLocation && (
                <ListItemCurrentLocation startTime={startTime} />
            )}
            {startFromCurrentLocation && transitionFromCurrentLocation && (
                <ListItemWalk transition={transitionFromCurrentLocation} />
            )}
            {plan.places.map((place, i) => (
                <PlaceAndTransition
                    key={i}
                    place={place}
                    startTime={schedules[i].startTime}
                    endTime={schedules[i].endTime}
                    transition={plan.transitions.find(
                        (t) => t.fromPlaceId === place.id
                    )}
                />
            ))}
        </VStack>
    );
}

function PlaceAndTransition({
    place,
    startTime,
    endTime,
    transition,
}: {
    place: Place;
    startTime: Date;
    endTime: Date;
    transition?: Transition;
}) {
    return (
        <>
            <ListItemPlace
                place={place}
                startTime={startTime}
                endTime={endTime}
            />
            {transition && <ListItemWalk transition={transition} />}
        </>
    );
}

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

const ListItemCurrentLocation = ({ startTime }: { startTime: Date }) => {
    return (
        <HStack spacing={4}>
            <Icon
                as={MdOutlineLocationOn}
                w="20px"
                h="20px"
                color={Colors.beige["400"]}
            />
            <VStack alignItems="flex-start" spacing={0}>
                <Text>現在地</Text>
                <Text color="gray">{DateHelper.dateToHHMM(startTime)}</Text>
            </VStack>
        </HStack>
    );
};

const ListItemPlace = ({
    place,
    startTime,
    endTime,
}: {
    place: Place;
    startTime: Date;
    endTime: Date;
}) => {
    return (
        <VStack align="flex-start" w={"100%"}>
            <HStack w="100%" spacing={4}>
                <div>
                    <Donut />
                </div>
                <Text fontWeight="bold" fontSize="16px">
                    {DateHelper.dateToHHMM(startTime)}
                </Text>
            </HStack>
            <Box w="100%" alignItems="stretch" pl="24px" position="relative">
                <Box
                    w="8px"
                    backgroundColor="#ECCEAC"
                    position="absolute"
                    top="-12px"
                    bottom="-12px"
                    left="4px"
                ></Box>
                <PlanPlaceList
                    plan={{
                        places: [place],
                    }}
                />
            </Box>
            <HStack w="100%" spacing={4}>
                <div>
                    <Donut />
                </div>
                <Text fontWeight="bold" fontSize="16px">
                    {DateHelper.dateToHHMM(endTime)}
                </Text>
            </HStack>
        </VStack>
    );
};

const ListItemWalk = ({ transition }: { transition: Transition }) => {
    return (
        <HStack>
            <Center w="20px" h="20px">
                <Divider
                    orientation="vertical"
                    borderColor="rgba(0,0,0,.3)"
                    borderStyle="dashed"
                />
            </Center>
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
    );
};

const Donut = styled.div`
    width: 16px;
    height: 16px;
    border: 4px solid transparent;
    border-radius: 50%;
    outline: 4px solid #ecceac;
    background-color: white;
`;
