import { useEffect, useRef, useState } from "react";

export const usePlanCandidateGalleryPageAutoScroll = () => {
    const isAutoScrollingRef = useRef(false);
    const prevScrollYRef = useRef(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const planDetailPageRef = useRef<HTMLDivElement>(null);
    const [isUpperOfPlanDetailPage, setIsUpperOfPlanDetailPage] =
        useState(true);
    const [isAutoScrolling, setIsAutoScrolling] = useState(false);

    const scrollToPlanDetailPage = () => {
        if (!planDetailPageRef.current || !scrollContainerRef.current) return;
        scrollContainerRef.current.scrollTo({
            top: planDetailPageRef.current.offsetTop,
            behavior: "smooth",
        });
    };

    let scrollTimeout: NodeJS.Timeout | null = null;
    const scrollListener = (e: Event) => {
        if (scrollTimeout) clearTimeout(scrollTimeout);

        if (!planDetailPageRef.current || !scrollContainerRef) return;

        const isAutoScrolling = isAutoScrollingRef.current;
        const currentScroll = scrollContainerRef.current.scrollTop;
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
        if (!planDetailPageRef.current || !scrollContainerRef) return;

        // スクロールが停止したときも、自動スクロール中は継続する
        const isAutoScrolling = isAutoScrollingRef.current;
        const currentScroll = scrollContainerRef.current.scrollTop;
        const offsetTopPlanDetailPage = planDetailPageRef.current.offsetTop;
        if (isAutoScrolling && currentScroll < offsetTopPlanDetailPage) {
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
        scrollContainerRef.current?.addEventListener("scroll", scrollListener, {
            passive: false,
        });

        return () => {
            scrollContainerRef.current?.removeEventListener(
                "scroll",
                scrollListener
            );
            clearTimeout(scrollTimeout);
        };
    }, [scrollContainerRef?.current, isAutoScrollingRef]);

    return {
        scrollContainerRef,
        planDetailPageRef,
        scrollToPlanDetailPage,
        isPlanFooterVisible: !isUpperOfPlanDetailPage || isAutoScrolling,
    };
};
