import { Box, HStack, Icon, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { MdLogin, MdLogout } from "react-icons/md";
import styled from "styled-components";

export function NavBarUserDialog({ children }: { children?: ReactNode }) {
    return (
        <Box maxW="100%" padding="32px">
            <VStack
                w="250px"
                maxW="100%"
                borderRadius="10px"
                boxShadow="0 0 0 1px #96a3b31a, 0 8px 28px -4px #96a3b34d"
                backgroundColor="white"
            >
                {children}
            </VStack>
        </Box>
    );
}

export function NavBarNonLoginUserDialog() {
    return (
        <NavBarUserDialog>
            <DialogItem icon={MdLogin}>ログイン</DialogItem>
        </NavBarUserDialog>
    );
}

export function NavBarLoginUserDialog() {
    return (
        <NavBarUserDialog>
            <DialogItem icon={MdLogout}>ログアウト</DialogItem>
        </NavBarUserDialog>
    );
}

function DialogItem({
    icon,
    children,
    onClick,
}: {
    icon?: IconType;
    children?: ReactNode;
    onClick?: () => void;
}) {
    return (
        <DialogItemContainer onClick={onClick}>
            <HStack spacing="16px" w="100%">
                {icon && <Icon color="#8f9faa" as={icon} w="24px" h="24px" />}
                <Box flex={1} textAlign="left">
                    {children}
                </Box>
            </HStack>
        </DialogItemContainer>
    );
}

const DialogItemContainer = styled.button`
    width: 100%;
    padding: 16px;

    &:hover {
        background-color: #f1f5f9;
    }
`;
