import { User } from "src/domain/models/User";
import {
    NavBarUserDialog,
    NavBarUserDialogActions,
} from "src/view/navigation/NavBarUserDialog";
import { UserAvatar } from "src/view/navigation/UserAvatar";
import { XStack } from "tamagui";

type Props = {
    user: User | null;
    safeAreaInsetTop?: number;
} & NavBarUserDialogActions;

export function NavBarUser({
    user,
    safeAreaInsetTop,
    onLogin,
    onLogout,
    onBindPreLoginState,
}: Props) {
    return (
        <XStack h="100%">
            <NavBarUserDialog
                user={user}
                safeAreaInsetTop={safeAreaInsetTop}
                onLogin={onLogin}
                onLogout={onLogout}
                onBindPreLoginState={onBindPreLoginState}
            >
                <UserAvatar user={user} />
            </NavBarUserDialog>
        </XStack>
    );
}
