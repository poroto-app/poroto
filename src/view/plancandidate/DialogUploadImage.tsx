import {
Box,
Button,
Center,
HStack,
Image,
Spinner,
Text,
VStack
} from "@chakra-ui/react";
import { FullscreenDialog } from "src/view/common/FullscreenDialog";

type Props = {
    visible: boolean;
    imageUrl: string;
    isUploading: boolean;
    onUploadClick: () => void;
    onClose: () => void;
};

const DialogUploadImage = ({
    visible,
    isUploading,
    imageUrl,
    onUploadClick,
    onClose,
}: Props) => {
    const renderContent = () => {
        if (isUploading) {
            return (
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="#84A6FF"
                    size="xl"
                />
            );
        } else {
            return (
                <VStack
                    flex={1}
                    w="100%"
                    px="16px"
                    py="16px"
                    alignItems="center"
                    spacing="32px"
                >
                    <Box
                        w="200px"
                        h="200px"
                        borderRadius="20px"
                        overflow="hidden"
                    >
                        <Image
                            src={imageUrl}
                            alt="選択された画像"
                            maxWidth="100%"
                            height="auto"
                            display={!isUploading ? "block" : "none"}
                        />
                    </Box>
                    <Text fontSize="20px" fontWeight="bold" color="#574836">
                        この画像をアップロードしますか？
                    </Text>
                    <HStack mt="auto" pb="48px">
                        <Button onClick={onClose} variant="text">
                            キャンセル
                        </Button>
                        <Button onClick={onUploadClick} colorScheme="red">
                            アップロード
                        </Button>
                    </HStack>
                </VStack>
            );
        }
    };

    return (
        <FullscreenDialog
            position="bottom"
            width="100%"
            visible={visible}
            onClickOutside={() => {
                if (!isUploading) onClose();
            }}
        >
            <Center
                backgroundColor="white"
                w="100%"
                h="900px"
                maxH="80vh"
                borderTopRadius="20px"
                overflowY="scroll"
                sx={{
                    "::-webkit-scrollbar": {
                        display: "none",
                    },
                }}
            >
                {renderContent()}
            </Center>
        </FullscreenDialog>
    );
};

export default DialogUploadImage;
