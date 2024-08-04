import { AlertCircle, Check, Info } from "@tamagui/lucide-icons";
import {
    Toast,
    ToastProvider,
    ToastViewport,
    useToastState,
} from "@tamagui/toast";
import { ReactNode } from "react";
import { Padding } from "src/constant/padding";
import { hasValue } from "src/domain/util/null";
import { reduxNativeSelector } from "src/redux/native";
import { isWeb, XStack, YStack } from "tamagui";

export function AppToastProvider({ children }: { children?: ReactNode }) {
    const { safeAreaTop, safeAreaRight, safeAreaLeft } = reduxNativeSelector();

    return (
        <>
            <ToastProvider burntOptions={{ from: "bottom" }}>
                {children}
                <ToastComponent />
                <ToastViewport
                    right={(safeAreaRight ?? 0) + Padding.p16}
                    top={(safeAreaTop ?? 0) + Padding.p16}
                    left={(safeAreaLeft ?? 0) + Padding.p16}
                />
            </ToastProvider>
        </>
    );
}

const ToastComponent = () => {
    const currentToast = useToastState();

    const toastColor = () => {
        switch (currentToast.burntOptions?.preset) {
            case "error":
                return "$red10";
            case "done":
                return "$blue10";
            case "none":
                return "$green10";
            default:
                return "$green10";
        }
    };

    if (!currentToast || currentToast.isHandledNatively) return null;

    return (
        <Toast
            key={currentToast.id}
            onOpenChange={currentToast.onOpenChange}
            duration={currentToast.duration ?? 3000}
            enterStyle={{
                opacity: 0,
                scale: 0.5,
                y: -20,
            }}
            exitStyle={{ opacity: 0, scale: 1, y: -20 }}
            y={0}
            opacity={1}
            scale={1}
            animation="quicker"
            viewportName={currentToast.viewportName}
            unstyled
            width="100%"
            maxWidth={isWeb && 400}
            borderRadius={5}
            backgroundColor={toastColor()}
        >
            <XStack
                gap={Padding.p16}
                px={Padding.p16}
                py={Padding.p8}
                alignItems="center"
                width="100%"
            >
                <ToastIcon preset={currentToast.burntOptions?.preset} />
                <YStack flex={1}>
                    <Toast.Title fontWeight="bold" color="white">
                        {currentToast.title}
                    </Toast.Title>
                    {hasValue(currentToast.message) && (
                        <Toast.Description
                            fontSize={13}
                            fontWeight={400}
                            color="white"
                        >
                            {currentToast.message}
                        </Toast.Description>
                    )}
                </YStack>
            </XStack>
        </Toast>
    );
};

function ToastIcon({ preset }: { preset?: "error" | "done" | "none" }) {
    const getIcon = () => {
        switch (preset) {
            case "error":
                return AlertCircle;
            case "done":
                return Check;
            case "none":
                return Info;
            default:
                return Info;
        }
    };
    const Icon = getIcon();
    return <Icon color="white" size={32} />;
}
