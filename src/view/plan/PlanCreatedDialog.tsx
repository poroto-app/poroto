import { Box, Text, VStack } from "@chakra-ui/react";
import HappyNewsIcon from "src/view/assets/svg/happy_news.svg";
import { FullscreenDialog } from "src/view/common/FullscreenDialog";

export type Props = {
    onClickClose: () => void;
};

export function PlanCreatedDialog({ onClickClose }: Props) {
    return (
        <FullscreenDialog onClickOutside={onClickClose}>
            <VStack
                backgroundColor="#FFF8F3"
                borderRadius="30px"
                maxW="100%"
                px="32px"
                py="48px"
                spacing="24px"
            >
                <HappyNewsIcon
                    viewBox="0 0 471.64422 535.27925"
                    style={{
                        width: "100%",
                        height: "300px",
                    }}
                />
                <Text fontSize="24px" fontWeight="bold">
                    プランが完成しました!
                </Text>
                <Box
                    as="button"
                    w="100%"
                    px="16px"
                    py="8px"
                    border="3px solid black"
                    borderRadius="20px"
                    fontWeight="bold"
                    fontSize="16px"
                    onClick={onClickClose}
                >
                    とじる
                </Box>
            </VStack>
        </FullscreenDialog>
    );
}
