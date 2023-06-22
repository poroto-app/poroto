import { Icon } from "@chakra-ui/react";
import { useRef } from "react";
import { IconType } from "react-icons";
import styled from "styled-components";

export const SelectButton = ({
    color,
    onClick,
    icon,
}: {
    color: string;
    onClick: () => void;
    icon: IconType;
}) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleOnClick = () => {
        // MEMO: ボタンにCSSのactive状態が適用されるのはボタンを押している間だけなので、
        // Refを使ってフォーカス状態を長めに発生させる
        buttonRef.current.focus();
        setTimeout(() => buttonRef?.current?.blur(), 200);
        onClick();
    };

    return (
        <Button color={color} ref={buttonRef} onClick={handleOnClick}>
            <Icon w="32px" h="32px" color={color} as={icon} />
        </Button>
    );
};

const Button = styled.button<{ color: string }>`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    -webkit-tap-highlight-color: transparent;

    background-color: white;
    border: 2px solid ${({ color }) => color};
    border-radius: 100px;
    padding: 8px;

    transition: all 200ms;

    &:focus {
        background-color: ${({ color }) => color};

        > svg {
            color: white;
        }

        transform: scale(0.8);
    }
`;
