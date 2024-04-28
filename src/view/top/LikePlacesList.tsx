import { VStack } from "@chakra-ui/react";
import { CSSProperties } from "react";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { Transition, TransitionStatus } from "react-transition-group";
import { Place } from "src/domain/models/Place";
import { hasValue } from "src/domain/util/null";
import { HorizontalScrollableList } from "src/view/common/HorizontalScrollableList";
import { Padding } from "src/view/constants/padding";
import { Size } from "src/view/constants/size";
import { PlaceCard } from "src/view/place/PlaceCard";
import { PlanListSectionTitle } from "src/view/top/PlanListSectionTitle";

type Props = {
    places: Place[] | null;
    onSelectLikePlace?: (placeId: string) => void;
};

const transitionStyles: {
    [key in TransitionStatus]: CSSProperties | undefined;
} = {
    entering: { opacity: 0.3, transform: "scaleY(80%) translateY(-20%)" },
    entered: { opacity: 1, transform: "scaleY(100%) translateY(0)" },
    exiting: { opacity: 0, height: 0 },
    exited: { opacity: 0, visibility: "hidden", height: 0 },
    unmounted: { opacity: 0, visibility: "hidden", height: 0 },
};

export function LikePlacesList({ places, onSelectLikePlace }: Props) {
    // まだどこにもいいねをしていない場合
    // 高さを余分に取ってしまうため、何も表示しない
    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Transition
            in={hasValue(places) && places.length > 0}
            timeout={{
                enter: 200,
                exit: 0,
            }}
        >
            {(state) =>
                state === "exited" ? (
                    <></>
                ) : (
                    <VStack
                        w="100%"
                        style={{
                            transition: "transform 0.2s ease-in-out, opacity 0.2s ease-in-out",
                            ...transitionStyles[state],
                        }}
                    >
                        <PlanListSectionTitle
                            title="お気に入りの場所"
                            icon={MdOutlineFavoriteBorder}
                        />
                        <HorizontalScrollableList px={Padding.p16}>
                            {places?.map((place, index) => (
                                <PlaceCard
                                    key={index}
                                    place={place}
                                    w={Size.PlanList.LikePlace.w}
                                    h={Size.PlanList.LikePlace.h}
                                    onClick={() => onSelectLikePlace?.(place.id)}
                                />
                            ))}
                        </HorizontalScrollableList>
                    </VStack>
                )
            }
        </Transition>
    );
}
