import { Center, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FullscreenDialog } from "src/view/common/FullscreenDialog";
import { RoundedButton } from "src/view/common/RoundedButton";
import { RoundedDialog } from "src/view/common/RoundedDialog";
import { Asset } from "src/view/constants/asset";
import { Padding } from "src/view/constants/padding";

type Props = {
    visible: boolean;
    onClose?: () => void;
};

export const InstructionTabs = {
    iPhone: "iPhone",
    iPad: "iPad",
};
export type InstructionTab =
    (typeof InstructionTabs)[keyof typeof InstructionTabs];

export function PwaIosInstruction({ visible, onClose }: Props) {
    const [currentTab, setCurrentTab] = useState<InstructionTab>(
        InstructionTabs.iPhone
    );
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (!videoRef.current) return;
        videoRef.current.load();
    }, [currentTab]);

    return (
        <FullscreenDialog
            visible={visible}
            onClickOutside={onClose}
            paddingX={Padding.p8}
            paddingY={Padding.p8}
        >
            <RoundedDialog h="min(100vh, 600px)" w="min(100vw, 800px)">
                <VStack
                    py={Padding.p32}
                    h="100%"
                    w="100%"
                    maxH="100%"
                    spacing="16px"
                >
                    <Text px={Padding.p16} fontSize="24px">
                        ホーム画面への追加方法
                    </Text>
                    <VStack w="100%" flex={1}>
                        <Center w="100%" px={Padding.p16}>
                            <Tab
                                currentTab={currentTab}
                                onSwitchTab={setCurrentTab}
                            />
                        </Center>
                        <Center
                            flex={1}
                            w="100%"
                            py={Padding.p8}
                            px={Padding.p16}
                            backgroundColor="#DDDDDD"
                            overflow="hidden"
                        >
                            <Center w="100%" h="100%" position="relative">
                                <video
                                    ref={videoRef}
                                    autoPlay={true}
                                    muted
                                    loop
                                    style={{
                                        height: "100%",
                                        maxHeight: "100%",
                                        maxWidth: "100%",
                                        borderRadius: "20px",
                                        margin: "auto",
                                        position: "absolute",
                                        top: "0",
                                        right: "0",
                                        bottom: "0",
                                        left: "0",
                                    }}
                                >
                                    <source
                                        src={
                                            currentTab ===
                                            InstructionTabs.iPhone
                                                ? Asset.movies.pwaIos.iPhone
                                                : Asset.movies.pwaIos.iPad
                                        }
                                        type="video/mp4"
                                    />
                                </video>
                            </Center>
                        </Center>
                    </VStack>
                    <Center w="100%" px={Padding.p16}>
                        <RoundedButton onClick={onClose}>とじる</RoundedButton>
                    </Center>
                </VStack>
            </RoundedDialog>
        </FullscreenDialog>
    );
}

function Tab({
    currentTab,
    onSwitchTab,
}: {
    currentTab: InstructionTab;
    onSwitchTab: (tab: InstructionTab) => void;
}) {
    return (
        <HStack
            w="100%"
            px="4px"
            py="4px"
            backgroundColor="#EFEFEF"
            borderRadius="5px"
        >
            <TabButton
                active={currentTab === InstructionTabs.iPhone}
                label="iPhone"
                onClick={() => onSwitchTab(InstructionTabs.iPhone)}
            />
            <TabButton
                active={currentTab === InstructionTabs.iPad}
                label="iPad"
                onClick={() => onSwitchTab(InstructionTabs.iPad)}
            />
        </HStack>
    );
}

function TabButton({
    active,
    label,
    onClick,
}: {
    active: boolean;
    label: string;
    onClick: () => void;
}) {
    return (
        <Center
            flex={1}
            py="4px"
            px="8px"
            color={!active && "#B7B7B7"}
            backgroundColor={active && "#FFFFFF"}
            borderRadius="5px"
            onClick={onClick}
        >
            <Text fontWeight="bold" fontSize="16px">
                {label}
            </Text>
        </Center>
    );
}
