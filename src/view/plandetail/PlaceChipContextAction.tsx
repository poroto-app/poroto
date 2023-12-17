import { HStack, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import {MdOutlineDeleteOutline, MdOutlineLocationOn} from "react-icons/md";
import {OnClickHandler} from "src/view/types/handler";

type Props = {
    label: string;
    icon: IconType;
    onClick: OnClickHandler;
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

export const PlaceChipActionDelete = ({onClick}: {onClick: OnClickHandler}) => {
    return <PlaceChipContextAction
        label="削除"
        icon={MdOutlineDeleteOutline}
        onClick={onClick}
    />
}

export const PlaceChipActionShowRelatedPlaces = ({onClick}: {onClick: OnClickHandler}) => {
    return <PlaceChipContextAction
        label="関連した場所を表示"
        icon={MdOutlineLocationOn}
        onClick={onClick}
    />
}