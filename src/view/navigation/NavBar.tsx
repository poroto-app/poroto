import { usePathname } from "solito/navigation";
import { useRouter } from "solito/router";
import { useAuth } from "src/hooks/useAuth";
import { useBindPreLoginState } from "src/hooks/useBindPreLoginState";
import { reduxHistorySelector } from "src/redux/history";
import { NavBarProps } from "src/types/props";
import { BindPreLoginStateConfirmationDialog } from "src/view/navigation/BindPreLoginStateConfirmationDialog";
import { NavBarComponent } from "src/view/navigation/NavBarComponent";
import { NavBarUser } from "src/view/navigation/NavBarUser";

export const NavBar = ({ canGoBack, defaultPath }: NavBarProps) => {
    const router = useRouter();
    const { historyStack } = reduxHistorySelector();
    const { user, signInWithGoogle, logout } = useAuth();
    const {
        isBindPreLoginStateDialogVisible,
        bindPlanCandidateSetsToUserRequestStatus,
        bindPreLoginState,
        showBindPreLoginStateDialog,
        onCloseBindPreLoginStateDialog,
    } = useBindPreLoginState();

    const handleOnBack = async () => {
        const pathname = usePathname();
        const isHome = pathname === "/";
        if (isHome) return;

        // 一つ前のページがporotoのページでない
        if (historyStack.length <= 1) {
            if (defaultPath) router.push(defaultPath);
            else router.push("/");
            return;
        }

        router.back();
    };

    return (
        <>
            <NavBarComponent
                canGoBack={canGoBack}
                onBack={handleOnBack}
                userComponent={
                    <NavBarUser
                        user={user}
                        onLogin={signInWithGoogle}
                        onLogout={logout}
                        onBindPreLoginState={showBindPreLoginStateDialog}
                    />
                }
            />
            <BindPreLoginStateConfirmationDialog
                visible={isBindPreLoginStateDialogVisible}
                bindingRequestStatus={bindPlanCandidateSetsToUserRequestStatus}
                onClose={onCloseBindPreLoginStateDialog}
                onClickYes={() => bindPreLoginState()}
            />
        </>
    );
};
