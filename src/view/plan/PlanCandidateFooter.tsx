import { Button, Center, HStack} from "@chakra-ui/react";
import { Colors } from "src/view/constants/color";

type Props = {
    onSave: () => void;
    onEdit: () => void;
};

export const FooterHeight = 80;

export function PlanCandidateFooter({ onSave, onEdit}: Props) {
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
        >
            <HStack w="100%" maxW="var(--max-page-width)" h="100%">
                {process.env.NODE_ENV !== "production" && (
                    <Button
                        variant="outline"
                        flex={1}
                        borderColor={Colors.primary["400"]}
                        color={Colors.primary["400"]}
                        borderRadius={10}
                        onClick={onEdit}
                    >
                        編集
                    </Button>
                )}
                <Button
                    variant="solid"
                    flex={1}
                    color="white"
                    backgroundColor={Colors.primary["400"]}
                    borderRadius={10}
                    onClick={onSave}
                >
                    保存
                </Button>
            </HStack>
        </Center>
    );
}
