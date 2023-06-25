import { ButtonProps, HStack, Icon } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { RoundedButton } from "src/view/common/RoundedButton";

type Props = {
    icon: IconType;
    onClick?: () => void;
    disabled?: boolean;
    children?: ReactNode;
} & ButtonProps;

export function RoundedIconButton({
    icon,
    onClick,
    disabled,
    children,
}: Props) {
    return (
        <RoundedButton onClick={onClick} disabled={disabled ?? false}>
            <HStack w="100%" justifyContent="center">
                {icon && <Icon mb="6px" w="32px" h="32px" as={icon} m={0}/>}
                {children}
            </HStack>
        </RoundedButton>
    );
}
