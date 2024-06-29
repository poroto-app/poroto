import { getAnalytics, logEvent } from "@firebase/analytics";
import { useEffect } from "react";
import { AnalyticsEvents } from "src/view/constants/analytics";

export function ErrorLogger() {
    useEffect(() => {
        const handleError = (event: ErrorEvent) => {
            logEvent(getAnalytics(), AnalyticsEvents.Error, {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                error: event.error,
            });

            if(process.env.APP_ENV === "development") {
                console.error({
                    message: event.message,
                    filename: event.filename,
                    lineno: event.lineno,
                    colno: event.colno,
                    error: event.error,
                });
            }
        };

        window.addEventListener("error", handleError);
        return () => {
            window.removeEventListener("error", handleError);
        };
    }, []);
    return <></>;
}
