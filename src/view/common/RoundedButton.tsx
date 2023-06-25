import { ButtonProps, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { Colors } from "src/view/constants/color";
import styled from "styled-components";

type Props = {
    text: string;
    icon?: IconType;
    onClick?: () => void;
    disabled?: boolean;
} & ButtonProps;

export function RoundedButton({ text, icon, onClick, disabled }: Props) {
    return (
        <Rounded onClick={onClick} disabled={disabled ?? false}>
            {icon && <Icon mb="6px" w="32px" h="32px" as={icon} />}
            <Text>{text}</Text>
        </Rounded>
    );
}

const Rounded = styled.div<{ disabled: boolean }>`
    background-color: ${({ disabled }) =>
        disabled ? "#8b8b8b" : Colors.primary["400"]};
    border-radius: 100px;
    color: white;
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
    display: flex;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    column-gap: 8px;
    padding: 4px 8px;
    width: 100%;
`;
