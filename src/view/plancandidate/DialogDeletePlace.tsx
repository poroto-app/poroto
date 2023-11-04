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
import { getImageSizeOf, ImageSizes } from "src/domain/models/Image";
import { Place } from "src/domain/models/Place";
import { FullscreenDialog } from "src/view/common/FullscreenDialog";

type Props = {
    placeToDelete: Place | null;
    isDialogVisible: boolean;
    isDeleting: boolean;
    onDelete: (props: { placeIdToDelete: string }) => void;
    onClose: () => void;
};

export function DialogDeletePlace({
    placeToDelete,
    isDeleting,
    isDialogVisible,
    onDelete,
    onClose,
}: Props) {
    const image =
        placeToDelete && placeToDelete.images.length > 0
            ? placeToDelete.images[0]
            : null;

    return (
        <FullscreenDialog
            position="bottom"
            width="100%"
            visible={isDialogVisible}
            onClickOutside={() => {
                // 削除中は閉じないようにする
                if (!isDeleting) onClose();
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
                {isDeleting || !placeToDelete ? (
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="#84A6FF"
                        size="xl"
                    />
                ) : (
                    <VStack
                        flex={1}
                        w="100%"
                        px="16px"
                        py="16px"
                        alignItems="center"
                        spacing="32px"
                    >
                        <VStack spacing="16px">
                            <Box
                                w="200px"
                                h="200px"
                                borderRadius="20px"
                                overflow="hidden"
                            >
                                {image && (
                                    <Image
                                        w="100%"
                                        h="100%"
                                        objectFit="cover"
                                        src={getImageSizeOf(
                                            ImageSizes.Small,
                                            image
                                        )}
                                    />
                                )}
                            </Box>
                            <Text fontSize="18px">
                                <b>「{placeToDelete.name}」</b>を削除しますか？
                            </Text>
                        </VStack>
                        <HStack mt="auto" pb="48px">
                            <Button onClick={onClose} variant="text">
                                キャンセル
                            </Button>
                            <Button
                                onClick={() =>
                                    onDelete({
                                        placeIdToDelete: placeToDelete.id,
                                    })
                                }
                                colorScheme="red"
                            >
                                削除
                            </Button>
                        </HStack>
                    </VStack>
                )}
            </Center>
        </FullscreenDialog>
    );
}
