import { Box, Text, VStack } from "@chakra-ui/react";
import HappyNewsIcon from "src/view/assets/svg/happy_news.svg";
import { FullscreenDialog } from "src/view/common/FullscreenDialog";

export type Props = {
    visible: boolean;
    onClickCopyUrl: () => void;
    onClickClose: () => void;
};

export function PlanCreatedDialog(
    { onClickCopyUrl, onClickClose, visible }: Props
) {
    return (
        <FullscreenDialog onClickOutside={onClickClose} visible={visible}>
            <VStack
                backgroundColor="#FFF8F3"
                borderRadius="30px"
                maxW="100%"
                px="32px"
                py="16px"
                spacing="24px"
            >
                <HappyNewsIcon
                    viewBox="0 0 471.64422 535.27925"
                    style={{
                        width: "100%",
                        height: "300px",
                        marginTop: "32px",
                    }}
                />
                <Text fontSize="24px" fontWeight="bold">
                    しおりが完成しました!
                </Text>
                <VStack spacing="8px" w="100%">
                    <Box
                        as="button"
                        w="100%"
                        px="16px"
                        py="8px"
                        border="3px solid black"
                        borderRadius="20px"
                        fontWeight="bold"
                        fontSize="16px"
                        onClick={onClickCopyUrl}
                    >
                        しおりのURLをコピー
                    </Box>
                    <Box
                        as="button"
                        w="100%"
                        px="16px"
                        py="8px"
                        fontWeight="bold"
                        fontSize="16px"
                        onClick={onClickClose}
                    >
                        とじる
                    </Box>
                </VStack>
            </VStack>
        </FullscreenDialog>
    );
}
