import { Center, HStack } from "@chakra-ui/react";
import { Colors } from "src/view/constants/color";
import { PlanActionButton } from "src/view/plan/button/PlanActionButton";

type Props = {
    onSave: () => void;
    onEdit: () => void;
};

export const FooterHeight = 80;

export function PlanCandidateFooter({ onSave, onEdit }: Props) {
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
                    <PlanActionButton
                        fitHeight
                        center
                        color={Colors.primary["400"]}
                        borderRadius={10}
                        text="編集"
                        onClick={onEdit}
                    />
                )}
                <PlanActionButton
                    filled
                    fitHeight
                    center
                    color={Colors.primary["400"]}
                    borderRadius={10}
                    text="保存"
                    onClick={onSave}
                />
            </HStack>
        </Center>
    );
}
