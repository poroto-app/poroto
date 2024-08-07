import { useEffect, useRef, useState } from "react";
import { useRouter } from "solito/router";

export const usePlanCandidateGalleryPageAutoScroll = ({
    planCandidateId,
    isScrollSnapEnabled,
}: {
    planCandidateId: string;
    isScrollSnapEnabled: boolean;
}) => {
    const router = useRouter();
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
    const scrollListenerToSnap = () => {
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
    };

    // Footerの表示・非表示を制御する
    const scrollListerToShowFooter = () => {
        if (!planDetailPageRef.current) return;

        const currentScroll = window.scrollY;
        const offsetTopPlanDetailPage = planDetailPageRef.current.offsetTop;
        const isUpperOfPlanDetailPage = currentScroll < offsetTopPlanDetailPage;
        setIsUpperOfPlanDetailPage(isUpperOfPlanDetailPage);
    };

    useEffect(() => {
        if (isScrollSnapEnabled) {
            window.addEventListener("scroll", scrollListenerToSnap);
        }

        return () => {
            window.removeEventListener("scroll", scrollListenerToSnap);
            clearTimeout(scrollTimeout);
        };
    }, [isAutoScrollingRef, isScrollSnapEnabled]);

    useEffect(() => {
        window.addEventListener("scroll", scrollListerToShowFooter);

        return () => {
            window.removeEventListener("scroll", scrollListerToShowFooter);
        };
    }, []);

    // プラン詳細画面で戻るボタンを押したときに、プラン一覧画面にスクロールする
    useEffect(() => {
        let shouldScrollToPlanDetailPage = false;
        const handleScroll = () => {
            if (!planDetailPageRef.current) return;

            const planCandidateIdInHistory =
                window.history.state?.planCandidateId;
            const isLowerOfPlanDetailPage =
                window.scrollY >= planDetailPageRef.current.offsetTop;
            if (
                isLowerOfPlanDetailPage &&
                planCandidateIdInHistory != planCandidateId
            ) {
                // 何度も戻るボタンを押さなくても良いように
                // 一度だけ History にエントリーを追加する
                window.history.pushState({ planCandidateId }, "");
            }

            shouldScrollToPlanDetailPage = isLowerOfPlanDetailPage;
        };

        const handlePopState = (e: PopStateEvent) => {
            if (shouldScrollToPlanDetailPage) {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
                // TODO: fix me!
                // router.events.emit("routeChangeComplete", router.asPath);
                e.preventDefault();
            }
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("popstate", handlePopState);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    return {
        planDetailPageRef,
        scrollToPlanDetailPage,
        isPlanFooterVisible: !isUpperOfPlanDetailPage || isAutoScrolling,
    };
};
