import { ReactNode } from "react";
import { Size } from "src/constant/size";
import { zIndex } from "src/constant/zIndex";
import { View, YStack } from "tamagui";

type Props = {
    height?: string | number;
    navBar?: ReactNode;
    bottomNavigation?: ReactNode;
    maxW?: number;
    header?: ReactNode;
    children: ReactNode;
};

export function Layout({
    height = "100%",
    navBar,
    bottomNavigation,
    maxW = Size.mainContentWidth,
    header,
    children,
}: Props) {
    return (
        <YStack
            w="100%"
            h={height}
            alignItems="center"
            justifyContent="flex-start"
            overflow="hidden"
            gap={0}
            pb={bottomNavigation ? Size.BottomNavigation.height : 0}
        >
            {navBar && navBar}
            {header && <View w="100%">{header}</View>}
            <YStack
                w="100%"
                h="100%"
                flexDirection="column"
                alignItems="center"
                justifyContent="flex-start"
                position="relative"
            >
                <YStack maxWidth={maxW} w="100%" h="100%">
                    {children}
                </YStack>
            </YStack>
            {bottomNavigation && (
                <BottomNavigationWrapper>
                    {bottomNavigation}
                </BottomNavigationWrapper>
            )}
        </YStack>
    );
}

function BottomNavigationWrapper({ children }: { children: ReactNode }) {
    // TODO: Nativeに対応する
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const position: "absolute" | "relative" | "static" | undefined = "fixed";

    return (
        <YStack
            position={position}
            left={0}
            right={0}
            bottom={0}
            zIndex={zIndex.bottomNavigation}
        >
            {children}
        </YStack>
    );
}
