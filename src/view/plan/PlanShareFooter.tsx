import { Button, Center, HStack, Icon, useToast } from "@chakra-ui/react";
import { RiShareForwardLine } from "react-icons/ri";
import { Colors } from "src/view/constants/color";

export const FooterHeight = 80;

export function PlanShareFooter() {
    const toast = useToast();

    function copyUrl() {
        const url: string = location.href;
        navigator.clipboard.writeText(url);

        toast({
            title: "URLを共有",
            description: "URLがクリップボードにコピーされました。",
            status: "success",
            duration: 3000, // ポップアップが表示される時間（ミリ秒）
            isClosable: true,
        });
    }

    return (
        <Center
            backgroundColor="white"
            borderTop="1px solid rgba(0,0,0,.1)"
            h={`${FooterHeight}px`}
            w="100%"
            position="fixed"
            px="16px"
            py="16px"
            bottom={0}
            left={0}
            right={0}
            zIndex={10}
        >
            <HStack w="100%" maxW="var(--max-page-width)" h="100%">
                <Button
                    variant="solid"
                    flex={1}
                    color="white"
                    backgroundColor={Colors.primary["400"]}
                    borderRadius={10}
                    onClick={copyUrl}
                    leftIcon={<Icon as={RiShareForwardLine} boxSize={6} />}
                >
                    共有
                </Button>
            </HStack>
        </Center>
    );
}
