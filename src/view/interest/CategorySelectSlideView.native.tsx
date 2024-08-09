import { useEffect, useRef, useState } from "react";
import PagerView from "react-native-pager-view";
import { ImageSize } from "src/data/graphql/generated";
import { CategorySelectSlideViewProps } from "src/types/props";
import {
    CategorySelectDefaultPlaceThumbnail,
    CategorySelectPlaceThumbnail,
} from "src/view/interest/CategorySelectPlaceThumbnail";

export const CategorySelectSlideView = ({
    category,
    interactiveAnimation = true,
}: CategorySelectSlideViewProps) => {
    const pagerViewRef = useRef<PagerView>();

    const sleep = (msec: number) =>
        new Promise((resolve) => setTimeout(resolve, msec));

    // スライドできることを示すために、最初だけ自動でスライドアニメーションを表示する
    const [
        isInteractiveAnimationAlreadyPlayed,
        setIsInteractiveAnimationAlreadyPlayed,
    ] = useState(false);

    const placesOfCategory = category.places.filter(
        (place) => place.images.length > 0
    );

    const playInteractiveAnimation = async (pagerView: PagerView) => {
        // 画面が切り替わった直後に再生されないようにする
        await sleep(1000);

        // 少しだけスライドする
        pagerView.setPage(1);
        await sleep(300);

        // 元の位置に戻す
        pagerView.setPage(0);
    };

    useEffect(() => {
        const pagerView = pagerViewRef.current;
        if (!pagerView) return;

        // カテゴリが切り替わったときは、初期ページに戻るようにする
        pagerView.setPageWithoutAnimation(0);

        // 初めて複数の場所が表示されたときにのみ、アニメーションを表示する
        const shouldPlayInteractiveAnimation =
            interactiveAnimation &&
            !isInteractiveAnimationAlreadyPlayed &&
            placesOfCategory.length > 0;
        if (shouldPlayInteractiveAnimation) {
            playInteractiveAnimation(pagerView);
            setIsInteractiveAnimationAlreadyPlayed(true);
        }
    }, [category.name]);

    return (
        <>
            <PagerView
                useNext
                ref={pagerViewRef}
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                }}
                initialPage={0}
            >
                <CategorySelectDefaultPlaceThumbnail
                    imageUrl={category.defaultThumbnailUrl}
                />
                {placesOfCategory
                    .filter((p) => p.images.length > 0)
                    .map((place, index) => (
                        <CategorySelectPlaceThumbnail
                            key={index}
                            place={place}
                            category={{
                                id: category.name,
                                displayName: category.displayName,
                            }}
                            imageSize={ImageSize.Large}
                        />
                    ))}
            </PagerView>
        </>
    );
};
