import { useEffect, useState } from "react";
import { isSafari } from "react-device-detect";
import { hasValue } from "src/domain/util/null";
import { LocalStorageKeys } from "src/view/constants/localStorageKey";
import { isPC } from "src/view/constants/userAgent";
import {useToast} from "@chakra-ui/react";

// TODO: iOSのインストール手順をダイアログで見せる（インストール手順をスクリーンショットで見せる）
export const usePwaInstall = () => {
    const toast = useToast();
    const [pwaInstallEvent, setPwaInstallEvent] = useState<Event | null>(null);
    const [isPwaSupported, setIsPwaSupported] = useState(false);
    const [isRunningOnPwa, setIsRunningOnPwa] = useState(false);
    const [isPwaInstalled, setIsPwaInstalled] = useState(false);
    const [isPwaInstallCanceled, setIsPwaInstallCanceled] = useState(false);

    const checkIsPwaSupported = () => {
        return (
            "serviceWorker" in navigator &&
            "storage" in navigator &&
            "permissions" in navigator
        );
    };

    const checkIsRunningOnPwa = () => {
        return window.matchMedia("(display-mode: standalone)").matches;
    };

    const checkIsPwaInstallCanceled = () => {
        return (
            localStorage.getItem(LocalStorageKeys.cancelInstallPwa) === "true"
        );
    };

    const checkIsAlreadyInstalled = () => {
        return localStorage.getItem(LocalStorageKeys.pwaInstalled) === "true";
    };

    const checkIsIosSafari = () => {
        // TODO: productionでも表示する
        return isSafari && process.env.APP_ENV !== "production";
    };

    const installPwa = async () => {
        if (pwaInstallEvent) {
            const promptEvent = pwaInstallEvent;
            promptEvent["prompt"]();
            const choiceResult = await promptEvent["userChoice"];
            if (choiceResult.outcome === "accepted") {
                setPwaInstallEvent(null);
                setIsPwaInstalled(true);
                localStorage.setItem(LocalStorageKeys.pwaInstalled, "true");
            } else {
                setIsPwaInstalled(false);
            }
        }
    };

    const cancelInstallPwa = () => {
        localStorage.setItem(LocalStorageKeys.cancelInstallPwa, "true");
        setIsPwaInstallCanceled(true);
    };

    const handlePwaInstall = (event: Event) => {
        event.preventDefault();
        setPwaInstallEvent(event);
    };

    const handleAppInstalled = () => {
        toast({
            title: "ホームに追加されました",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    }

    useEffect(() => {
        setIsPwaSupported(checkIsPwaSupported());
        setIsRunningOnPwa(checkIsRunningOnPwa());
        setIsPwaInstalled(checkIsAlreadyInstalled());
        setIsPwaInstallCanceled(checkIsPwaInstallCanceled());

        window.addEventListener("beforeinstallprompt", handlePwaInstall);
        window.addEventListener("appinstalled", handleAppInstalled);
        return () => {
            window.removeEventListener("beforeinstallprompt", handlePwaInstall);
            window.removeEventListener("appinstalled", handleAppInstalled);
        };
    }, []);

    return {
        isPwaInstallVisible:
            isPwaSupported &&
            // Android: PWAインストール可能の場合は表示
            // iOS: Safariで表示しているときのみ表示
            (hasValue(pwaInstallEvent) || checkIsIosSafari()) &&
            // PCの場合は表示しない
            !isPC &&
            // すでにPWAがインストールされている場合は表示しない
            !isRunningOnPwa &&
            !isPwaInstalled &&
            // PWAインストールをキャンセルした場合は表示しない
            !isPwaInstallCanceled,
        cancelInstallPwa,
        installPwa,
    };
};
