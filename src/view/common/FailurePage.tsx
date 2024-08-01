import { type Namespace, ParseKeys, type TOptions } from "i18next";
import { ReactNode } from "react";
import { Colors } from "src/constant/color";
import { Padding } from "src/constant/padding";
import { AppTrans } from "src/view/common/AppTrans";
import { NavBar } from "src/view/navigation/NavBar";
import { Text, YStack } from "tamagui";

export type Props = {
    title: string;
    statusMessage?: string;
    statusDescription?: string;
    description?: ParseKeys<Namespace, TOptions, string>;
    smallTitle?: boolean;

    image: ReactNode;

    actions?: ReactNode;

    navBar?: ReactNode;
};

export function FailurePage({
    title,
    statusMessage,
    statusDescription,
    description,
    smallTitle = false,
    image,
    actions,
    navBar = <NavBar />,
}: Props) {
    return (
        <YStack w="100%" h="100%">
            {navBar}
            <YStack
                alignItems="center"
                justifyContent="center"
                w="100%"
                flex={1}
                py={Padding.p32}
                px={Padding.p16}
            >
                <YStack h="100%" maxWidth="600px">
                    <YStack
                        alignItems="center"
                        justifyContent="center"
                        flexDirection="column"
                        flex={1}
                        w="100%"
                        h="100%"
                        px={Padding.p16}
                    >
                        <Header
                            title={title}
                            statusMessage={statusMessage}
                            statusDescription={statusDescription}
                            smallTitle={smallTitle}
                        />
                        <ErrorImage image={image} />
                        <YStack gap={0} w="100%" alignItems="center">
                            {description && (
                                <Text color="rgba(0,0,0,.6)">
                                    <AppTrans i18nKey={description} />
                                </Text>
                            )}
                        </YStack>
                    </YStack>
                    <YStack w="100%" gap={Padding.p8}>
                        {actions}
                    </YStack>
                </YStack>
            </YStack>
        </YStack>
    );
}

function Header({
    title,
    statusMessage,
    statusDescription,
    smallTitle,
}: {
    title: string;
    statusMessage?: string;
    statusDescription?: string;
    smallTitle: boolean;
}) {
    return (
        <YStack w="100%" alignItems="flex-start" gap={0}>
            {statusMessage && (
                <Text
                    fontSize={32}
                    lineHeight={32}
                    color={Colors.primary["400"]}
                >
                    {statusMessage}
                </Text>
            )}
            <Text
                fontSize={smallTitle ? 30 : 80}
                lineHeight={smallTitle ? 30 : 80}
                fontWeight="bold"
                color={Colors.primary["400"]}
            >
                {title}
            </Text>
            {statusDescription && (
                <Text color="rgba(0,0,0,.6)" mt={Padding.p16}>
                    {statusDescription}
                </Text>
            )}
        </YStack>
    );
}

function ErrorImage({ image }: { image: ReactNode }) {
    return (
        <YStack w="100%" alignItems="center" justifyContent="center">
            <YStack w="100%" maxWidth={450} my={Padding.p32}>
                {image}
            </YStack>
        </YStack>
    );
}
