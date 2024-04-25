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

    const scrollListener = () => {
        if (!planDetailPageRef.current) return;

        const isAutoScrolling = isAutoScrollingRef.current;
        const currentScroll = window.scrollY;
        const isScrollingDown = currentScroll > prevScrollYRef.current;
        const offsetTopPlanDetailPage = planDetailPageRef.current.offsetTop;

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
    };

    const scrollEndListener = () => {
        if(!planDetailPageRef.current) return;

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
        window.addEventListener("scrollend", scrollEndListener);

        return () => {
            window.removeEventListener("scroll", scrollListener);
            window.removeEventListener("scrollend", scrollEndListener);
        };
    }, [isAutoScrollingRef]);

    return {
        planDetailPageRef,
        scrollToPlanDetailPage,
        isPlanFooterVisible: !isUpperOfPlanDetailPage || isAutoScrolling,
    };
};
