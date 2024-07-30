import { getAnalytics, logEvent } from "@firebase/analytics";
import { IconProps } from "@tamagui/helpers-icon";
import { DownloadCloud, LogIn, LogOut } from "@tamagui/lucide-icons";
import { type Namespace, ParseKeys, type TOptions } from "i18next";
import { NamedExoticComponent, ReactNode } from "react";
import { AnalyticsEvents } from "src/constant/analytics";
import { User } from "src/domain/models/User";
import { hasValue, when } from "src/domain/util/null";
import { OnClickHandler } from "src/types/handler";
import { AppTrans } from "src/view/common/AppTrans";
import { Button, Popover, Text, View, XStack, YStack } from "tamagui";

type Props = {
    user: User | null;
    safeAreaInsetTop?: number;
    children?: ReactNode;
} & NavBarUserDialogActions;

export type NavBarUserDialogActions = {
    onLogin: () => void;
    onLogout: () => void;
    onBindPreLoginState?: OnClickHandler;
};

export function NavBarUserDialog({
    user,
    safeAreaInsetTop = 0,
    children,
    onLogin,
    onLogout,
    onBindPreLoginState,
}: Props) {
    const handleOnLogout = () => {
        logEvent(getAnalytics(), AnalyticsEvents.User.Logout);
        onLogout();
    };

    const handleOnLogin = () => {
        logEvent(getAnalytics(), AnalyticsEvents.User.LoginStart);
        onLogin();
    };

    const handleOnBindPreLoginState = when(
        hasValue(onBindPreLoginState),
        () => {
            logEvent(getAnalytics(), AnalyticsEvents.User.BindPreLoginState);
            onBindPreLoginState();
        }
    );

    return (
        <Popover placement="bottom-end" offset={{ mainAxis: safeAreaInsetTop }}>
            <Popover.Trigger asChild>
                <Button unstyled justifyContent="center">
                    {children}
                </Button>
            </Popover.Trigger>

            <Popover.Content
                backgroundColor="white"
                shadowColor="#96a3b31a"
                shadowOffset={{ width: 0, height: 8 }}
                shadowRadius={28}
                borderRadius={16}
                padding={0}
                enterStyle={{ y: 10, opacity: 0 }}
                exitStyle={{ y: 10, opacity: 0 }}
                animation={[
                    "fast",
                    {
                        opacity: {
                            overshootClamping: true,
                        },
                    },
                ]}
            >
                <NavBarUserDialogContent
                    user={user}
                    onLogin={handleOnLogin}
                    onLogout={handleOnLogout}
                    onBindPreLoginState={handleOnBindPreLoginState}
                />
            </Popover.Content>
        </Popover>
    );
}

function NavBarUserDialogContent({
    user,
    onLogin,
    onLogout,
    onBindPreLoginState,
}: {
    user: User;
    onLogin: OnClickHandler;
    onLogout: OnClickHandler;
    onBindPreLoginState: OnClickHandler;
}) {
    if (user)
        return (
            <NavBarLoginUserDialog
                onLogout={onLogout}
                onBindPreLoginState={onBindPreLoginState}
            />
        );
    return <NavBarNonLoginUserDialog onLogin={onLogin} />;
}

export function NavBarNonLoginUserDialog({ onLogin }: { onLogin: () => void }) {
    return (
        <NavBarUserDialogContainer>
            <DialogItem
                i18nKey={"account:login"}
                icon={LogIn}
                onClick={onLogin}
            />
        </NavBarUserDialogContainer>
    );
}

export function NavBarLoginUserDialog({
    onLogout,
    onBindPreLoginState,
}: {
    onLogout: OnClickHandler;
    onBindPreLoginState: OnClickHandler;
}) {
    return (
        <NavBarUserDialogContainer>
            {hasValue(onBindPreLoginState) && (
                <DialogItem
                    i18nKey={"account:retainDataBeforeLogin"}
                    icon={DownloadCloud}
                    onClick={onBindPreLoginState}
                />
            )}
            <DialogItem
                i18nKey={"account:logout"}
                icon={LogOut}
                onClick={onLogout}
            />
        </NavBarUserDialogContainer>
    );
}

function NavBarUserDialogContainer({ children }: { children?: ReactNode }) {
    return (
        <XStack maxWidth="100%">
            <YStack
                w={250}
                maxWidth="100%"
                borderRadius={10}
                backgroundColor="white"
                overflow="hidden"
            >
                {children}
            </YStack>
        </XStack>
    );
}

function DialogItem({
    i18nKey,
    icon: Icon,
    onClick,
}: {
    i18nKey: ParseKeys<Namespace, TOptions, string>;
    icon?: NamedExoticComponent<IconProps>;
    onClick?: () => void;
}) {
    return (
        <Popover.Close asChild>
            <Button
                unstyled
                p={16}
                w="100%"
                hoverStyle={{ backgroundColor: "#f1f5f9" }}
                onPress={onClick}
            >
                <XStack gap={16} w="100%">
                    {Icon && <Icon color="#8f9faa" size={24} />}
                    <View flex={1}>
                        <Text textAlign="left">
                            <AppTrans i18nKey={i18nKey} />
                        </Text>
                    </View>
                </XStack>
            </Button>
        </Popover.Close>
    );
}
