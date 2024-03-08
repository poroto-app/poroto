import { Image } from "@chakra-ui/image";
import { Button,Center } from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import { FullscreenDialog } from "src/view/common/FullscreenDialog";

type Props = {
    visible: boolean;
    imageUrl: string;
    onUploadClick: () => void;
    onClose: () => void;
};

const DialogUploadImage = ({ visible, imageUrl, onUploadClick, onClose }: Props) => {
    if (!visible) {
        return null;
    }

    return (
        <FullscreenDialog
            position="bottom"
            width="100%"
            visible={visible}
            onClickOutside={() => {
                onClose();
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
                    <Image
                        src={imageUrl}
                        alt="選択された画像"
                        maxWidth="100%"
                        height="auto"
                    />
                    <Button onClick={onUploadClick}>アップロード</Button>
                    <MdClose onClick={onClose} />
            </Center>
        </FullscreenDialog>
    );
};

export default DialogUploadImage;