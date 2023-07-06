import { HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { MdOutlineLocationOn } from "react-icons/md";
import { Place } from "src/domain/models/Place";
import { Plan } from "src/domain/models/Plan";
import { DateHelper } from "src/domain/util/date";
import { Colors } from "src/view/constants/color";

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

    return (
        <VStack alignItems="flex-start" w="100%" spacing="16px">
            {startFromCurrentLocation && (
                <ListItemCurrentLocation startTime={startTime} />
            )}
            {plan.places.map((place, i) => (
                <ListItemPlace
                    key={i}
                    place={place}
                    startTime={schedules[i].startTime}
                    endTime={schedules[i].endTime}
                />
            ))}
        </VStack>
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
        <HStack spacing={4}>
            <Icon
                as={MdOutlineLocationOn}
                w="20px"
                h="20px"
                color={Colors.beige["400"]}
            />
            <VStack alignItems="flex-start" spacing={0}>
                <Text>{place.name}</Text>
                <Text color="gray">
                    {DateHelper.dateToHHMM(startTime)} -{" "}
                    {DateHelper.dateToHHMM(endTime)}
                </Text>
            </VStack>
        </HStack>
    );
};
