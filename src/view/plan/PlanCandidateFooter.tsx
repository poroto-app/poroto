import { HStack } from "@chakra-ui/react";
import { Colors } from "src/view/constants/color";
import { PlanActionButton } from "src/view/plan/button/PlanActionButton";

type Props = {
    onSave: () => void;
};

export const FooterHeight = 80;

export function PlanCandidateFooter({ onSave }: Props) {
    return (
        <HStack
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
    );
}
