import { useEffect, useRef, useState } from "react";
import {
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from "react-native";
import { Padding } from "src/constant/padding";
import { Size } from "src/constant/size";
import { Time } from "src/constant/time";
import { Plan } from "src/domain/models/Plan";
import { reduxNativeSelector } from "src/redux/native";
import {
    PlanCandidateGalleryCard,
    PlanCandidateGalleryCardPlaceHolder,
} from "src/view/plancandidate/PlanCandidatesGalleryCard";
import { YStack } from "tamagui";

export type Props = {
    planCandidates: Plan[];
    defaultActivePlanIndex?: number;
    activePlanIndex?: number;
    isCreating?: boolean;
    onActiveIndexChange?: (index: number) => void;
};

export function PlanCandidatesGallery({
    planCandidates,
    defaultActivePlanIndex = 0,
    activePlanIndex,
    isCreating = false,
    onActiveIndexChange,
}: Props) {
    const flatListRef = useRef<FlatList>();
    const [activeIndex, setActiveIndex] = useState(defaultActivePlanIndex);
    const { screenWidth } = reduxNativeSelector();

    const onClickCard = (i: number) => {
        flatListRef.current?.scrollToIndex({ index: i });
    };

    const onClickFirstItem = (i: number) => {
        setTimeout(() => {
            const prevActiveIndex =
                (i - 1 + planCandidates.length) % planCandidates.length;
            onClickCard(prevActiveIndex);
        }, 50);
    };

    const onClickLastItem = (i: number) => {
        // カードタップによるこのカードへの移動処理と
        // カード中の最後の画像タップによる次のカードへの移動処理が重ならないように
        // 次のカードへの移動処理を遅延させる
        setTimeout(() => {
            const nextActiveIndex = (i + 1) % planCandidates.length;
            onClickCard(nextActiveIndex);
        }, Time.PlanCandidateGallery.lastItemTransitionDelay);
    };

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(
            contentOffsetX / (Size.PlanCandidatesGallery.Card.w + Padding.p32)
        );
        setActiveIndex(index);
    };

    useEffect(() => {
        if (!activePlanIndex) return;
        if (activePlanIndex === activeIndex) return;
        setActiveIndex(activePlanIndex);
        // 指定されたページに移動
    }, [activePlanIndex]);

    useEffect(() => {
        onActiveIndexChange?.(activeIndex);
    }, [activeIndex]);

    return (
        <YStack w="100%" h="100%" justifyContent="center" alignItems="center">
            <FlatList
                ref={flatListRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                snapToInterval={Size.PlanCandidatesGallery.Card.w + Padding.p32}
                snapToAlignment="start"
                decelerationRate="fast"
                initialNumToRender={planCandidates.length}
                initialScrollIndex={0}
                contentContainerStyle={{
                    alignItems: "center",
                    // 画面中央に表示
                    paddingHorizontal:
                        (screenWidth - Size.PlanCandidatesGallery.Card.w) / 2,
                }}
                onScroll={onScroll}
                data={isCreating ? [...planCandidates, null] : planCandidates}
                keyExtractor={(item, index) => index.toString()}
                getItemLayout={(data, index) => ({
                    index,
                    length: Padding.p32 + Size.PlanCandidatesGallery.Card.w,
                    offset:
                        (Padding.p32 + Size.PlanCandidatesGallery.Card.w) *
                        index,
                })}
                renderItem={({ item, index }) => (
                    <YStack
                        key={index}
                        mr={index !== planCandidates.length - 1 && Padding.p32}
                        w={Size.PlanCandidatesGallery.Card.w}
                        h={Size.PlanCandidatesGallery.Card.h.active}
                        onPress={() => onClickCard(index)}
                    >
                        {item ? (
                            <PlanCandidateGalleryCard
                                plan={item}
                                isActive={index === activeIndex}
                                onClickFirstItem={() => onClickFirstItem(index)}
                                onClickLastItem={() => onClickLastItem(index)}
                            />
                        ) : (
                            <PlanCandidateGalleryCardPlaceHolder />
                        )}
                    </YStack>
                )}
            />
        </YStack>
    );
}
