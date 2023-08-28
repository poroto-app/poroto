import { Box, HStack, Icon, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { MdLogin, MdLogout } from "react-icons/md";
import { User } from "src/domain/models/User";
import styled from "styled-components";

type Props = {
    user: User | null;
    onLogin: () => void;
    onLogout: () => void;
    onClose: () => void;
};

export function NavBarUserDialog({ user, onLogin, onLogout, onClose }: Props) {
    const handleOnLogout = () => {
        onLogout();
        onClose();
    };

    const handleOnLogin = () => {
        onLogin();
        onClose();
    };

    if (user) return <NavBarLoginUserDialog onLogout={handleOnLogout} />;
    return <NavBarNonLoginUserDialog onLogin={handleOnLogin} />;
}

export function NavBarNonLoginUserDialog({ onLogin }: { onLogin: () => void }) {
    return (
        <NavBarUserDialogContainer>
            <DialogItem icon={MdLogin} onClick={onLogin}>
                ログイン
            </DialogItem>
        </NavBarUserDialogContainer>
    );
}

export function NavBarLoginUserDialog({ onLogout }: { onLogout: () => void }) {
    return (
        <NavBarUserDialogContainer>
            <DialogItem icon={MdLogout} onClick={onLogout}>
                ログアウト
            </DialogItem>
        </NavBarUserDialogContainer>
    );
}

function NavBarUserDialogContainer({ children }: { children?: ReactNode }) {
    return (
        <Box maxW="100%">
            <VStack
                w="250px"
                maxW="100%"
                borderRadius="10px"
                boxShadow="0 0 0 1px #96a3b31a, 0 8px 28px -4px #96a3b34d"
                backgroundColor="white"
                overflow="hidden"
            >
                {children}
            </VStack>
        </Box>
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

export function NavBarUserDialogOverlay({ onClick }: { onClick: () => void }) {
    return (
        <Box
            position="fixed"
            top={0}
            right={0}
            bottom={0}
            left={0}
            onClick={onClick}
            zIndex={100}
        />
    );
}
