import { Text, VStack } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { Place } from "src/domain/models/Place";
import { createArrayWithSize } from "src/domain/util/array";
import { hasValue } from "src/domain/util/null";
import UndrawOuterSpaceIcon from "src/view/assets/svg/outer_space.svg";
import { HorizontalScrollableList } from "src/view/common/HorizontalScrollableList";
import { Padding } from "src/view/constants/padding";
import { Size } from "src/view/constants/size";
import { isPC } from "src/view/constants/userAgent";
import { PlaceCard } from "src/view/place/PlaceCard";
import { PlanListSectionTitle } from "src/view/top/PlanListSectionTitle";

type Props = {
    places: Place[] | null;
    onSelectLikePlace?: (placeId: string) => void;
    numPlaceHolders?: number;
};

export function LikePlacesList({
    places,
    onSelectLikePlace,
    numPlaceHolders = 6,
}: Props) {
    const { t } = useTranslation();
    return (
        <VStack w="100%">
            <PlanListSectionTitle
                px={Padding.p16}
                title={t("place:favoritePlaces")}
                icon={MdOutlineFavoriteBorder}
            />
            <HorizontalScrollableList
                px={Padding.p16}
                pageButtonVisible={
                    isPC && hasValue(places) && places.length > 0
                }
            >
                <LikePlaces
                    places={places}
                    onSelectLikePlace={onSelectLikePlace}
                    numPlaceHolders={numPlaceHolders}
                />
            </HorizontalScrollableList>
        </VStack>
    );
}

function LikePlaces({
    places,
    onSelectLikePlace,
    numPlaceHolders = 6,
}: {
    places: Place[] | null;
    onSelectLikePlace?: (placeId: string) => void;
    numPlaceHolders: number;
}) {
    if (!hasValue(places)) {
        return (
            <>
                {createArrayWithSize(numPlaceHolders).map((i) => (
                    <PlaceCard
                        key={i}
                        place={null}
                        w={Size.PlanList.LikePlace.w + "px"}
                        h={Size.PlanList.LikePlace.h + "px"}
                    />
                ))}
            </>
        );
    }

    if (places.length === 0) {
        return <Empty />;
    }

    return (
        <>
            {places.map((place, index) => (
                <PlaceCard
                    key={index}
                    place={place}
                    w={Size.PlanList.LikePlace.w + "px"}
                    h={Size.PlanList.LikePlace.h + "px"}
                    onClick={() => onSelectLikePlace?.(place.id)}
                />
            ))}
        </>
    );
}

function Empty() {
    const { t } = useTranslation();
    return (
        <VStack
            w="100%"
            h={Size.PlanList.LikePlace.h + "px"}
            color="rgba(0,0,0,.7)"
            justifyContent="center"
            spacing={{
                base: "16px",
                md: "32px",
            }}
            flexDirection={{
                base: "column",
                md: "row",
            }}
        >
            <UndrawOuterSpaceIcon
                viewBox="0 0 902.41854 826.20679"
                style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "100%",
                }}
            />
            <VStack spacing={0} alignItems="flex-start">
                <Text fontSize="1.2rem" fontWeight="bold">
                    {t("place:favoritePlacesEmptyTitle")}
                </Text>
                <Text>{t("place:favoritePlacesEmptyDescription")}</Text>
            </VStack>
        </VStack>
    );
}
