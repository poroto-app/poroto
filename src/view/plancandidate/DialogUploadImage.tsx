import {
    Box,
    Button,
    Center,
    HStack,
    Image,
    Spinner,
    Text,
    VStack,
} from "@chakra-ui/react";
import { FullscreenDialog } from "src/view/common/FullscreenDialog";

const DIALOG_WIDTH = "100%";
const MAX_DIALOG_HEIGHT = "80vh";
const IMAGE_BOX_SIZE = "200px";

type Props = {
    visible: boolean;
    imageUrl: string;
    isUpload: boolean;
    onUploadClick: () => void;
    onClose: () => void;
};

const DialogUploadImage = ({
    visible,
    isUpload,
    imageUrl,
    onUploadClick,
    onClose,
}: Props) => {
    const renderContent = () => {
        if (isUpload) {
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
                        w={IMAGE_BOX_SIZE}
                        h={IMAGE_BOX_SIZE}
                        borderRadius="20px"
                        overflow="hidden"
                    >
                        <Image
                            src={imageUrl}
                            alt="選択された画像"
                            maxWidth="100%"
                            height="auto"
                            display={!isUpload ? "block" : "none"}
                        />
                    </Box>
                    <Text fontSize="20px" fontWeight="bold" color="#574836">
                        こちらの画像をアップロードしますか？
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
            width={DIALOG_WIDTH}
            visible={visible}
            onClickOutside={() => {
                if (!isUpload) onClose();
            }}
        >
            <Center
                backgroundColor="white"
                w={DIALOG_WIDTH}
                h="900px"
                maxH={MAX_DIALOG_HEIGHT}
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
