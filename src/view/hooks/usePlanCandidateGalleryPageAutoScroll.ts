import { useEffect, useRef, useState } from "react";

export const usePlanCandidateGalleryPageAutoScroll = () => {
    const isAutoScrollingRef = useRef(false);
    const prevScrollYRef = useRef(0);
    const planDetailPageRef = useRef<HTMLDivElement>(null);
    const [isUpperOfPlanDetailPage, setIsUpperOfPlanDetailPage] =
        useState(true);
    const [isAutoScrolling, setIsAutoScrolling] = useState(false);

    const scrollToPlanDetailPage = () => {
        if (!planDetailPageRef.current) return;
        window.scrollTo({
            top: planDetailPageRef.current.offsetTop,
            behavior: "smooth",
        });
    };

    let scrollTimeout: NodeJS.Timeout | null = null;
    const scrollListener = () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);

        if (!planDetailPageRef.current) return;

        const isAutoScrolling = isAutoScrollingRef.current;
        const currentScroll = window.scrollY;
        const offsetTopPlanDetailPage = planDetailPageRef.current.offsetTop;

        // Safariだとページ上部までいきおいよくスクロールすると、スクロール量がマイナスになり
        // スクロール方向も下方向になることがあるため、その場合はスクロール量を0として扱う
        const isBounded = prevScrollYRef.current < 0;
        const isScrollingDown =
            currentScroll > prevScrollYRef.current && !isBounded;

        // PlanDetailのトップより上で下方向にスクロールした場合は
        // プラン詳細セクションのトップまで自動スクロールを開始
        if (
            !isAutoScrolling &&
            currentScroll < offsetTopPlanDetailPage &&
            isScrollingDown
        ) {
            window.scrollTo({
                top: offsetTopPlanDetailPage,
                behavior: "smooth",
            });
            isAutoScrollingRef.current = true;
            setIsAutoScrolling(true);
        }

        const isUpperOfPlanDetailPage = currentScroll < offsetTopPlanDetailPage;
        setIsUpperOfPlanDetailPage(isUpperOfPlanDetailPage);
        if (isAutoScrollingRef.current) {
            isAutoScrollingRef.current = isUpperOfPlanDetailPage;
            setIsAutoScrolling(isUpperOfPlanDetailPage);
        }

        prevScrollYRef.current = currentScroll;

        // 100ms経過しても scroll イベントが呼び出されない場合は、スクロールが終了したとみなす
        scrollTimeout = setTimeout(() => {
            scrollEndListener();
        }, 100);
    };

    const scrollEndListener = () => {
        if (!planDetailPageRef.current) return;

        // スクロールが停止したときも、自動スクロール中は継続する
        const isAutoScrolling = isAutoScrollingRef.current;
        const currentScroll = window.scrollY;
        const offsetTopPlanDetailPage = planDetailPageRef.current.offsetTop;
        if (isAutoScrolling && currentScroll < offsetTopPlanDetailPage) {
            window.scrollTo({
                top: offsetTopPlanDetailPage,
                behavior: "smooth",
            });
            isAutoScrollingRef.current = true;
            setIsAutoScrolling(true);
        } else {
            isAutoScrollingRef.current = false;
            setIsAutoScrolling(false);
        }

        const isUpperOfPlanDetailPage = currentScroll < offsetTopPlanDetailPage;
        setIsUpperOfPlanDetailPage(isUpperOfPlanDetailPage);
    };

    useEffect(() => {
        window.addEventListener("scroll", scrollListener);

        return () => {
            window.removeEventListener("scroll", scrollListener);
            clearTimeout(scrollTimeout);
        };
    }, [isAutoScrollingRef]);

    return {
        planDetailPageRef,
        scrollToPlanDetailPage,
        isPlanFooterVisible: !isUpperOfPlanDetailPage || isAutoScrolling,
    };
};
