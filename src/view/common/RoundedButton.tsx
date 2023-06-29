import { ButtonProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Colors } from "src/view/constants/color";
import styled from "styled-components";

type Props = {
    onClick?: () => void;
    disabled?: boolean;
    children?: ReactNode;
} & ButtonProps;

export function RoundedButton({ onClick, disabled, children }: Props) {
    return (
        <Rounded onClick={onClick} disabled={disabled ?? false}>
            {children}
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
    height: 2.5rem;
    align-items: center;
    justify-content: center;
    column-gap: 8px;
    padding: 4px 8px;
    width: 100%;
    text-decoration: none;
`;
