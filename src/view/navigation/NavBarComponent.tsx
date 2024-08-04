import { ArrowLeft } from "@tamagui/lucide-icons";
import { ReactNode } from "react";
import { Link } from "solito/link";
import { Padding } from "src/constant/padding";
import { Routes } from "src/constant/router";
import { Size } from "src/constant/size";
import { NavBarProps } from "src/types/props";
import AppLogoImage from "src/view/assets/svg/app_logo_horizontal.svg";
import { XStack } from "tamagui";

export const NavBarComponent = ({
    safeAreaInsetTop = 0,
    canGoBack,
    onBack,
    userComponent,
}: NavBarProps & {
    userComponent?: ReactNode;
}) => {
    return (
        <XStack
            w="100%"
            h={Size.NavBar.height + safeAreaInsetTop}
            paddingTop={safeAreaInsetTop}
            backgroundColor="white"
            borderBottomColor={"rgba(0, 0, 0, 0.1)"}
            borderBottomWidth={1}
            justifyContent="center"
        >
            <XStack
                w="100%"
                maxWidth={990}
                px={Padding.p16}
                alignItems="center"
                gap={Padding.p8}
            >
                {canGoBack && (
                    <ArrowLeft
                        size={20}
                        cursor="pointer"
                        color="black"
                        onPress={onBack}
                    />
                )}
                <XStack
                    flex={1}
                    h="100%"
                    justifyContent="flex-start"
                    overflow="hidden"
                >
                    <AppLogo />
                </XStack>
                {userComponent && userComponent}
            </XStack>
        </XStack>
    );
};

function AppLogo() {
    return (
        <Link href={Routes.home} viewProps={{ style: { height: "100%" } }}>
            <XStack h="100%">
                <AppLogoImage
                    viewBox={"0 0 276 57"}
                    // 57:276 は画像のアスペクト比
                    width={(33 / 57) * 276}
                    height="100%"
                />
            </XStack>
        </Link>
    );
}
