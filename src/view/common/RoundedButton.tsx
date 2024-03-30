import { ButtonProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Colors } from "src/view/constants/color";
import styled from "styled-components";

type Props = {
    onClick?: () => void;
    disabled?: boolean;
    outlined?: boolean;
    children?: ReactNode;
    color?: string;
} & ButtonProps;

export function RoundedButton({
    onClick,
    disabled,
    outlined,
    color = Colors.primary["400"],
    children,
}: Props) {
    return (
        <Rounded
            onClick={onClick}
            disabled={disabled ?? false}
            $outlined={outlined ?? false}
            $color={color}
        >
            {children}
        </Rounded>
    );
}

const Rounded = styled.div<{
    disabled: boolean;
    $outlined: boolean;
    $color: string;
}>`
    background-color: ${({ disabled, $outlined, $color }) =>
        disabled ? "#8b8b8b" : $outlined ? "white" : $color};
    border-radius: 100px;
    border: ${({ $outlined }) =>
        $outlined ? `2px solid ${Colors.primary["400"]}` : "none"};
    color: ${({ $outlined }) =>
        $outlined ? Colors.primary["400"] : "#ffffff"};
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
    display: flex;
    font-weight: bold;
    height: 2.5rem;
    align-items: center;
    justify-content: center;
    column-gap: 8px;
    padding: 4px 8px;
    width: 100%;
    text-decoration: none;
`;
