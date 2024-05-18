import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
} from "@chakra-ui/react";
import { CollageTemplate } from "src/view/plandetail/CollageTemplate";

interface SavePlanCollageImageDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const sampleCollageData = {
    title: "コラージュ画像のプレビュー",
    places: [
        {
            name: "Place 1",
            duration: 60,
            imageUrl: "https://via.placeholder.com/400",
        },
        {
            name: "Place 2",
            duration: 45,
            imageUrl: "https://via.placeholder.com/400",
        },
        {
            name: "Place 3",
            duration: 30,
            imageUrl: "https://via.placeholder.com/400",
        },
    ],
    introduction: "このコラージュ画像はプラン内の場所をまとめたものです",
};

const SavePlanCollageImageDialog: React.FC<SavePlanCollageImageDialogProps> = ({
    isOpen,
    onClose,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxW="1300px">
                <ModalCloseButton />
                <ModalBody>
                    <Box h="100%" overflow="auto">
                        <CollageTemplate {...sampleCollageData} />
                    </Box>
                    <Button colorScheme="blue" mt={4} onClick={onClose}>
                        保存する
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default SavePlanCollageImageDialog;
