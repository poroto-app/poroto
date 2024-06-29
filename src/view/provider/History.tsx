// ページ遷移を記録するためのコンポーネント
import { useRouter } from "next/router";
import { useEffect } from "react";
import { copyObject } from "src/domain/util/object";
import {
    popHistoryStack,
    pushHistoryStack,
    reduxHistorySelector,
} from "src/redux/history";
import { useAppDispatch } from "src/redux/redux";

export function History() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { historyStack } = reduxHistorySelector();

    useEffect(() => {
        dispatch(
            pushHistoryStack({
                path: router.asPath,
                key: history.state.key,
            })
        );
    }, []);

    useEffect(() => {
        const handlePopState = (e: PopStateEvent) => {
            dispatch(
                popHistoryStack({
                    path: e.state.path,
                    key: e.state.key,
                })
            );
        };

        const handleRouteChange = () => {
            dispatch(
                pushHistoryStack({
                    path: router.asPath,
                    key: history.state.key,
                })
            );
        };

        router.events.on("routeChangeComplete", handleRouteChange);
        window.addEventListener("popstate", handlePopState);
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
            window.removeEventListener("popstate", handlePopState);
        };
    }, [copyObject(historyStack)]);

    return <></>;
}
