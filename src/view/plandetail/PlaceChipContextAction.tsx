import { HStack, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

type Props = {
    label: string;
    icon: IconType;
    onClick: () => void;
};

export const PlaceChipContextAction = ({ label, icon, onClick }: Props) => {
    return (
        <HStack
            backgroundColor="#F1F1F1"
            color="#483216"
            onClick={onClick}
            as="button"
            px="8px"
            py="4px"
            borderRadius="20px"
        >
            <Icon w="16px" h="16px" as={icon} />
            <Text fontSize="0.8rem">{label}</Text>
        </HStack>
    );
};
