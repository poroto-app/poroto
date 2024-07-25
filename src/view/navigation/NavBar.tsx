import { Box, HStack, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode } from "react";
import { MdArrowBack } from "react-icons/md";
import { usePathname } from "solito/navigation";
import { useRouter } from "solito/router";
import { Padding } from "src/constant/padding";
import { Routes } from "src/constant/router";
import { Size } from "src/constant/size";
import { useAuth } from "src/hooks/useAuth";
import { useBindPreLoginState } from "src/hooks/useBindPreLoginState";
import { reduxHistorySelector } from "src/redux/history";
import AppLogoImage from "src/view/assets/svg/app_logo_horizontal.svg";
import { BindPreLoginStateConfirmationDialog } from "src/view/plandetail/BindPreLoginStateConfirmationDialog";
import { NavBarUser } from "src/view/user/NavBarUser";
import styled from "styled-components";

type Props = {
    canGoBack?: boolean;
    onBack?: () => void;
    // 履歴がないときに戻るときのデフォルトのパス
    defaultPath?: string;
};

export const NavBar = ({ canGoBack, defaultPath }: Props) => {
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

export const NavBarComponent = ({
    canGoBack,
    onBack,
    userComponent,
}: Props & {
    userComponent?: ReactNode;
}) => {
    return (
        <HStack
            alignItems="normal"
            w="100%"
            h={Size.NavBar.height + "px"}
            backgroundColor="white"
            borderBottom="1px solid rgba(0, 0, 0, 0.1)"
            py={Padding.p8 + "px"}
            fontSize="0.95rem"
            justifyContent="center"
        >
            <HStack w="100%" maxW="990px" spacing={4} px={Padding.p16 + "px"}>
                {canGoBack && (
                    <Icon
                        w="20px"
                        h="20px"
                        as={MdArrowBack}
                        cursor="pointer"
                        onClick={onBack}
                    />
                )}
                <HStack
                    flex={1}
                    h="100%"
                    justifyContent="flex-start"
                    overflow="hidden"
                >
                    <AppLogo />
                </HStack>
                {userComponent && userComponent}
            </HStack>
        </HStack>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    background-color: white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 8px 16px;
    font-size: 0.95rem;
    height: ${Size.NavBar.height + "px"};
    width: 100%;
`;

const AppLogo = () => {
    return (
        <Link href={Routes.home} style={{ height: "100%" }}>
            <Box h="100%">
                <AppLogoImage
                    viewBox={
                        "0 0 276 57" /*オリジナルのSVGのviewBoxと合わせている*/
                    }
                    width="calc(33 / 50 * 200)px"
                    height="100%"
                />
            </Box>
        </Link>
    );
};
