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
import { useState } from "react";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { OnClickHandler } from "src/types/handler";
import { FullscreenDialog } from "src/view/common/FullscreenDialog";

type Props = {
    visible: boolean;
    imageURLs: string[];
    isUploading: boolean;
    onUploadClick: () => void;
    onClose: () => void;
};

const DialogUploadImage = ({
    visible,
    isUploading,
    imageURLs,
    onUploadClick,
    onClose,
}: Props) => {
    const [dialogClosed, setDialogClosed] = useState(false);

    return (
        <FullscreenDialog
            position="bottom"
            width="100%"
            visible={visible && !dialogClosed}
            onClickOutside={onClose}
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
                {isUploading ? (
                    <Uploading />
                ) : (
                    <Confirm
                        imageUrls={imageURLs}
                        onUpload={onUploadClick}
                        onClose={() => {
                            setDialogClosed(true);
                            onClose();
                        }}
                    />
                )}
            </Center>
        </FullscreenDialog>
    );
};

const Confirm = ({
    imageUrls,
    onUpload,
    onClose,
}: {
    imageUrls: string[];
    onUpload: OnClickHandler;
    onClose: OnClickHandler;
}) => {
    const { t } = useAppTranslation();
    return (
        <VStack h="100%" w="100%" px="16px" py="16px">
            <VStack w="100%" flex={1} justifyContent="center" spacing="32px">
                <HStack gap="20px" flexWrap="wrap" justifyContent="center">
                    {imageUrls.map((url, index) => (
                        <Box
                            key={index}
                            w="200px"
                            h="200px"
                            borderRadius="20px"
                            overflow="hidden"
                        >
                            <Image
                                src={url}
                                alt={`選択された画像${index}`}
                                width="100%"
                                height="100%"
                                objectFit="cover"
                            />
                        </Box>
                    ))}
                </HStack>
                <Text fontSize="20px" fontWeight="bold" color="#574836">
                    {t("place:uploadPlacePhotoConfirmTitle")}
                </Text>
            </VStack>
            <HStack mt="32px" pb="48px">
                <Button onClick={onClose} variant="text">
                    {t("common:cancel")}
                </Button>
                <Button onClick={onUpload} colorScheme="red">
                    {t("common:upload")}
                </Button>
            </HStack>
        </VStack>
    );
};

const Uploading = () => {
    return (
        <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#84A6FF"
            size="xl"
        />
    );
};

export default DialogUploadImage;
