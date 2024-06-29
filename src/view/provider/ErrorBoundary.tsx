import { getAnalytics, logEvent } from "@firebase/analytics";
import { Component, ErrorInfo, ReactNode } from "react";
import { Error } from "src/view/common/Error";
import { AnalyticsEvents } from "src/view/constants/analytics";

type Props = {
    children: ReactNode;
};

type State = {
    hasError: boolean;
};

// https://nextjs.org/docs/pages/building-your-application/configuring/error-handling
export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        logEvent(getAnalytics(), AnalyticsEvents.Error, {
            message: error.message,
            stack: error.stack,
            errorInfo: errorInfo,
        });

        if (process.env.APP_ENV === "development") {
            console.error({
                message: error.message,
                stack: error.stack,
                errorInfo: errorInfo,
            });
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <Error
                    onReload={() => {
                        this.setState({ hasError: false });
                    }}
                />
            );
        }

        return this.props.children;
    }
}
