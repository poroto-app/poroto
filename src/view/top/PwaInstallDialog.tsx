import { Box, Button, Center, HStack, Text, VStack } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { CSSProperties } from "react";
import { Transition, TransitionStatus } from "react-transition-group";
import { AppTrans } from "src/view/common/AppTrans";
import { RoundedButton } from "src/view/common/RoundedButton";
import { Size } from "src/constant/size";

type Props = {
    visible: boolean;
    onClickInstall: () => void;
    onClickCancel: () => void;
};

const dialogStyles: {
    [key in TransitionStatus]: CSSProperties | undefined;
} = {
    entering: { opacity: 0, transform: "scale(0.9)" },
    entered: { opacity: 1, boxShadow: "0 0 20px 0 #f0dfca" },
    exiting: { opacity: 0, transform: "scale(0.9)" },
    exited: { opacity: 0 },
    unmounted: { opacity: 0 },
};

export function PwaInstallDialog({
    visible,
    onClickInstall,
    onClickCancel,
}: Props) {
    const { t } = useTranslation();
    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Transition
            in={visible}
            timeout={{
                enter: 200,
                exit: 200,
            }}
        >
            {(state) =>
                !["exited", "unmounted"].includes(state) && (
                    <Center px={Size.top.px + "px"} w="100%" mt="16px">
                        <VStack
                            backgroundColor="white"
                            borderRadius="20px"
                            spacing="8px"
                            w="100%"
                            px="16px"
                            py="16px"
                            style={{
                                ...dialogStyles[state],
                                transition:
                                    "all 0.4s ease-in-out, box-shadow 0.4s 0.3s ease-in-out",
                            }}
                        >
                            <HStack
                                w="100%"
                                spacing="8px"
                                justifyContent="center"
                            >
                                <Image
                                    src="/icons/icon-384x384.png"
                                    alt="komichi"
                                    width={64}
                                    height={64}
                                    style={{ borderRadius: "20px" }}
                                />
                                <Text
                                    fontSize="1.1rem"
                                    fontWeight="bold"
                                    color="#45413E"
                                >
                                    <AppTrans
                                        i18nKey={"pwa:promptAddToHomeScreen"}
                                    />
                                </Text>
                            </HStack>
                            <HStack
                                w="100%"
                                py="8px"
                                justifyContent="space-between"
                            >
                                <Button
                                    flex={1}
                                    variant="link"
                                    onClick={onClickCancel}
                                >
                                    {t("common:cancel")}
                                </Button>
                                <Box flex={1}>
                                    <RoundedButton
                                        onClick={onClickInstall}
                                        color="#BF756E"
                                    >
                                        {t("pwa:addToHomeScreen")}
                                    </RoundedButton>
                                </Box>
                            </HStack>
                        </VStack>
                    </Center>
                )
            }
        </Transition>
    );
}
