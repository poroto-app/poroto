import { Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { Colors } from "src/view/constants/color";
import styled from "styled-components";

type Props = {
    text: string;
    imageUrl?: string;
    icon?: IconType;
    onClick?: () => void;
};

export const PlanActionButton = ({ text, onClick, imageUrl, icon }: Props) => {
    return (
        <BorderButton onClick={onClick}>
            {icon && (
                <Icon
                    w="32px"
                    h="32px"
                    as={icon}
                    color={Colors.primary["700"]}
                />
            )}
            {imageUrl && <IconImage src={imageUrl} />}
            <Text>{text}</Text>
        </BorderButton>
    );
};

const BorderButton = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: row;
    column-gap: 16px;
    align-items: center;
    justify-content: flex-start;
    font-weight: bold;
    padding: 8px 0;
    width: 100%;
`;

const IconImage = styled.img`
    width: 32px;
    height: 32px;
    object-fit: contain;
    border-radius: 5px;
`;
