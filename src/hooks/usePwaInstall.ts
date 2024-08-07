import { useToast } from "@chakra-ui/react";
import { getAnalytics, logEvent } from "@firebase/analytics";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { isSafari } from "react-device-detect";
import { AnalyticsEvents } from "src/constant/analytics";
import { LocalStorageKeys } from "src/constant/localStorageKey";
import { isPC } from "src/constant/userAgent";
import { hasValue } from "src/domain/util/null";

export const usePwaInstall = () => {
    const toast = useToast();
    const { t } = useTranslation();
    const [pwaInstallEvent, setPwaInstallEvent] = useState<Event | null>(null);
    const [isPwaSupported, setIsPwaSupported] = useState(false);
    const [isRunningOnPwa, setIsRunningOnPwa] = useState(false);
    const [isPwaInstalled, setIsPwaInstalled] = useState(false);
    const [isPwaInstallCanceled, setIsPwaInstallCanceled] = useState(false);
    const [isIosInstructionVisible, setIsIosInstructionVisible] =
        useState(false);

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
        return (
            localStorage.getItem(LocalStorageKeys.pwaInstalled) === "true" ||
            localStorage.getItem(LocalStorageKeys.iosAlreadyInstalledPwa) ===
                "true"
        );
    };

    const checkIsIosSafari = () => {
        return isSafari;
    };

    const markAlreadyInstalledToIosHome = () => {
        toast({
            title: t("pwa:pwaInstallationConfirmedResponse"),
            status: "success",
            duration: 3000,
            isClosable: true,
        });
        setIsPwaInstalled(true);
        localStorage.setItem(LocalStorageKeys.iosAlreadyInstalledPwa, "true");
        setIsIosInstructionVisible(false);
    };

    const installPwa = async () => {
        if (checkIsIosSafari()) {
            // iOSの場合はインストール手順を表示
            setIsIosInstructionVisible(true);
            return;
        }

        if (pwaInstallEvent) {
            const promptEvent = pwaInstallEvent;
            promptEvent["prompt"]();
            const choiceResult = await promptEvent["userChoice"];
            if (choiceResult.outcome === "accepted") {
                logEvent(getAnalytics(), AnalyticsEvents.Pwa.Install);
                setPwaInstallEvent(null);
                setIsPwaInstalled(true);
                localStorage.setItem(LocalStorageKeys.pwaInstalled, "true");
            } else {
                logEvent(getAnalytics(), AnalyticsEvents.Pwa.CancelOnPrompt);
                setIsPwaInstalled(false);
            }
        }
    };

    const cancelInstallPwa = () => {
        localStorage.setItem(LocalStorageKeys.cancelInstallPwa, "true");
        setIsPwaInstallCanceled(true);
        logEvent(getAnalytics(), AnalyticsEvents.Pwa.Cancel);
    };

    const handlePwaInstall = (event: Event) => {
        // アンインストールされたことをインストールイベントで検知
        localStorage.setItem(LocalStorageKeys.pwaInstalled, "false");
        setIsPwaInstalled(false);

        event.preventDefault();
        setPwaInstallEvent(event);
    };

    const handleAppInstalled = () => {
        toast({
            title: t("pwa:addedToHomeScreen"),
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    };

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
        isPwaInstallInstructionVisible: isIosInstructionVisible,
        cancelInstallPwa,
        installPwa,
        closePwaInstallInstruction: () => setIsIosInstructionVisible(false),
        markAlreadyInstalledToIosHome,
    };
};
