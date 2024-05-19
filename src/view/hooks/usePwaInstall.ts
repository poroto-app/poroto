import { useEffect, useState } from "react";
import { hasValue } from "src/domain/util/null";
import { LocalStorageKeys } from "src/view/constants/localStorageKey";
import { isPC } from "src/view/constants/userAgent";

export const usePwaInstall = () => {
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

    useEffect(() => {
        setIsPwaSupported(checkIsPwaSupported());
        setIsRunningOnPwa(checkIsRunningOnPwa());
        setIsPwaInstalled(checkIsAlreadyInstalled());
        setIsPwaInstallCanceled(checkIsPwaInstallCanceled());

        const handlePwaInstall = (event: Event) => {
            event.preventDefault();
            setPwaInstallEvent(event);
        };
        window.addEventListener("beforeinstallprompt", handlePwaInstall);
        return () => {
            window.removeEventListener("beforeinstallprompt", handlePwaInstall);
        };
    }, []);

    return {
        isPwaInstallVisible:
            isPwaSupported &&
            hasValue(pwaInstallEvent) &&
            !isPC &&
            !isRunningOnPwa &&
            !isPwaInstalled &&
            !isPwaInstallCanceled,
        cancelInstallPwa,
        installPwa,
    };
};
