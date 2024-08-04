import { Footprints, Plus } from "@tamagui/lucide-icons";
import { Colors } from "src/constant/color";
import { Padding } from "src/constant/padding";
import { Size } from "src/constant/size";
import { Place } from "src/domain/models/Place";
import { Plan } from "src/domain/models/Plan";
import { Transition } from "src/domain/models/Transition";
import { DateHelper } from "src/domain/util/date";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { UploadPlaceImageProps } from "src/hooks/useUploadPlaceImage";
import { AppTrans } from "src/view/common/AppTrans";
import {
    PlaceActionHandler,
    PlacePreview,
} from "src/view/plandetail/PlacePreview";
import { Text, XStack, YStack } from "tamagui";

type Props = {
    plan: Plan;
    likePlaceIds: string[];
    createdBasedOnCurrentLocation?: boolean;
    uploadPlaceImage?: UploadPlaceImageProps;
    onClickAddPlace?: (props: { previousPlaceId: string }) => void;
    onClickShowRelatedPlaces?: (placeId: string) => void;
    onClickDeletePlace?: (placeId: string) => void;

    /**
     * プランを開始する時間
     * 滞在する時間を表示するために利用される
     */
    startTime?: Date;
} & PlaceActionHandler;

export function PlanPlaceList({
    plan,
    likePlaceIds,
    createdBasedOnCurrentLocation,
    startTime = new Date(Date.now()),
    uploadPlaceImage,
    onClickAddPlace,
    onClickShowRelatedPlaces,
    onClickDeletePlace,
    onUpdateLikeAtPlace,
}: Props) {
    const { t } = useAppTranslation();
    const schedules = generateSchedules({
        places: plan.places,
        startTime,
        transitions: plan.transitions,
    });

    return (
        <YStack gap={0} w="100%">
            {createdBasedOnCurrentLocation && (
                <YStack w="100%" gap={0}>
                    <ScheduleListItem label={t("common:currentLocation")} />
                    <ListItemWalk
                        transition={plan.transitions.find(
                            // 現在地から最初の場所への移動ではPlaceがないので、fromPlaceIdがnullのものを取得する
                            (t) => t.fromPlaceId == null
                        )}
                    />
                </YStack>
            )}
            {plan.places.map((place, i) => (
                <YStack key={i} w="100%" gap={0}>
                    <YStack w="100" gap={0}>
                        <ScheduleListItem
                            label={DateHelper.dateToHHMM(
                                schedules[i].startTime
                            )}
                        />
                        <PlaceListItem
                            place={place}
                            like={likePlaceIds.some(
                                (placeId) => placeId === place.id
                            )}
                            uploadPlaceImage={uploadPlaceImage}
                            onClickAddPlace={onClickAddPlace}
                            onClickShowRelatedPlaces={onClickShowRelatedPlaces}
                            onClickDeletePlace={onClickDeletePlace}
                            onUpdateLikeAtPlace={onUpdateLikeAtPlace}
                        />
                        <ScheduleListItem
                            label={DateHelper.dateToHHMM(schedules[i].endTime)}
                        />
                    </YStack>
                    <ListItemWalk
                        transition={plan.transitions.find(
                            (t) => t.fromPlaceId == place.id
                        )}
                    />
                </YStack>
            ))}
        </YStack>
    );
}

/**
 * 各場所の滞在開始時間・終了時間を計算する
 */
function generateSchedules({
    places,
    startTime,
    transitions,
}: {
    places: Place[];
    startTime: Date;
    createdBasedOnCurrentLocation?: boolean;
    transitions: Transition[];
}): {
    startTime: Date;
    endTime: Date;
}[] {
    // 最初の場所の滞在開始時間は
    // 現在地から最初の場所への移動がある場合は、その移動時間を考慮する
    const transitionFromCurrentLocation = transitions.find(
        (t) => t.fromPlaceId == null
    );
    if (transitionFromCurrentLocation) {
        startTime = DateHelper.add(
            startTime,
            transitionFromCurrentLocation.durationInMinutes * 60 * 1000
        );
    }

    const schedules = [];
    for (const place of places) {
        const endTime = DateHelper.add(
            startTime,
            place.estimatedStayDuration * 60 * 1000
        );
        schedules.push({ startTime, endTime });

        // 次の場所の開始時間は、この場所からの移動時間を考慮する
        startTime = endTime;
        const transition = transitions.find((t) => t.fromPlaceId == place.id);
        if (transition) {
            startTime = DateHelper.add(
                endTime,
                transition.durationInMinutes * 60 * 1000
            );
        }
    }
    return schedules;
}

const PlaceListItem = ({
    place,
    like,
    uploadPlaceImage,
    onClickAddPlace,
    onClickShowRelatedPlaces,
    onClickDeletePlace,
    onUpdateLikeAtPlace,
}: {
    place: Place;
    like: boolean;
    uploadPlaceImage?: UploadPlaceImageProps;
    onClickAddPlace?: (props: { previousPlaceId: string }) => void;
    onClickShowRelatedPlaces?: (placeId: string) => void;
    onClickDeletePlace?: (placeId: string) => void;
} & PlaceActionHandler) => {
    return (
        <YStack
            w="100%"
            gap={Padding.p16}
            py={Padding.p16}
            pl={Padding.p24}
            position="relative"
        >
            <PlacePreview
                googlePlaceId={place.googlePlaceId}
                placeId={place.id}
                name={place.name}
                images={place.images}
                categories={place.categories}
                priceRange={place.priceRange}
                estimatedStayDuration={place.estimatedStayDuration}
                like={like}
                likeCount={place.likeCount}
                uploadPlaceImage={
                    uploadPlaceImage && {
                        ...uploadPlaceImage,
                        placeId: place.id,
                    }
                }
                onUpdateLikeAtPlace={onUpdateLikeAtPlace}
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
                <YStack
                    tag="button"
                    alignItems="center"
                    justifyContent="center"
                    borderWidth={1.5}
                    borderColor="#BD9F8E"
                    borderRadius={20}
                    w="100%"
                    py={Padding.p4}
                    onPress={() =>
                        onClickAddPlace({
                            previousPlaceId: place.id,
                        })
                    }
                >
                    <Plus color="#BD9F8E" size={20} />
                </YStack>
            )}
            {/* スケジュールを表すバー */}
            <XStack
                w={8}
                backgroundColor="#ECCEAC"
                position="absolute"
                top={-Size.PlanList.Schedule.dotRadius}
                bottom={-Size.PlanList.Schedule.dotRadius}
                left={
                    Size.PlanList.Schedule.dotRadius / 2 -
                    Size.PlanList.Schedule.borderWidth
                }
            />
        </YStack>
    );
};

const ScheduleListItem = ({
    label,
    pt,
    pb,
}: {
    label: string;
    pt?: number;
    pb?: number;
}) => {
    return (
        <XStack w="100%" gap={Padding.p16} pt={pt} pb={pb} alignItems="center">
            <XStack
                w={Size.PlanList.Schedule.dotRadius}
                h={Size.PlanList.Schedule.dotRadius}
                borderWidth={Size.PlanList.Schedule.borderWidth}
                borderColor="#ECCEAC"
                borderRadius={999}
                backgroundColor="white"
                zIndex={1}
            />
            <Text fontWeight="bold" fontSize={16}>
                {label}
            </Text>
        </XStack>
    );
};

const ListItemWalk = ({ transition }: { transition: Transition }) => {
    if (!transition) return <></>;

    return (
        <XStack w="100%" position="relative" py={Padding.p16}>
            <YStack
                position="absolute"
                left={Size.PlanList.Schedule.dotRadius / 2}
                top={0}
                bottom={0}
                borderLeftWidth={1}
                borderColor="rgba(0,0,0,.3)"
                borderStyle="dashed"
            />
            <XStack
                w="100%"
                pl={Padding.p16 + Size.PlanList.Schedule.dotRadius}
                gap={Padding.p8}
            >
                <Footprints size={20} color={Colors.beige["400"]} />
                <YStack alignItems="flex-start" gap={0}>
                    <Text>
                        <AppTrans
                            i18nKey="common:minutesLabel"
                            values={{ minutes: transition.durationInMinutes }}
                        />
                    </Text>
                </YStack>
            </XStack>
        </XStack>
    );
};
