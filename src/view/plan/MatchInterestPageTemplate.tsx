import { ReactNode } from "react";
import { Padding } from "src/constant/padding";
import { Size } from "src/constant/size";
import { Text, YStack } from "tamagui";

type Props = {
    message: string;
    navBar: ReactNode;
    children?: ReactNode;
};

export function MatchInterestPageTemplate({
    message,
    navBar,
    children,
}: Props) {
    return (
        <YStack h="100%" w="100%" alignItems="center" gap={0}>
            {navBar}
            <YStack
                flex={1}
                h="100%"
                w="100%"
                maxWidth={Size.mainContentWidth}
                px={Padding.p16}
                pt={Padding.p8}
                gap={Padding.p8}
                $sm={{
                    pb: Padding.p32,
                }}
                $gtSm={{
                    pb: Padding.p64,
                }}
            >
                <YStack
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                    px={Padding.p16}
                    py={Padding.p32}
                    borderWidth={1}
                    borderRadius={5}
                    borderColor="rgba(0, 0, 0, 0.1)"
                    backgroundColor="white"
                >
                    <Text userSelect="none">{message}</Text>
                </YStack>
                <YStack w="100%" flex={1}>
                    {children}
                </YStack>
            </YStack>
        </YStack>
    );
}
