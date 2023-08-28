import { Box, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { User } from "src/domain/models/User";
import {
    NavBarUserDialog,
    NavBarUserDialogOverlay,
} from "src/view/user/NavBarUserDialog";
import { UserAvatar } from "src/view/user/UserAvatar";

type Props = {
    user: User | null;
    onLogin: () => void;
    onLogout: () => void;
};

export function NavBarUser({ user, onLogin, onLogout }: Props) {
    const [isVisibleDialog, setIsVisibleDialog] = useState(false);
    return (
        <HStack h="100%">
            <Box position="relative">
                <UserAvatar
                    user={user}
                    onClick={() => setIsVisibleDialog(true)}
                />
                {isVisibleDialog && (
                    <>
                        <NavBarUserDialogOverlay
                            onClick={() => setIsVisibleDialog(false)}
                        />
                        <Box
                            position="absolute"
                            top="33px"
                            right={0}
                            mt="8px"
                            zIndex={999}
                        >
                            <NavBarUserDialog
                                user={user}
                                onClose={() => setIsVisibleDialog(false)}
                                onLogout={onLogout}
                                onLogin={onLogin}
                            />
                        </Box>
                    </>
                )}
            </Box>
        </HStack>
    );
}
