import { Box, HStack, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { MdArrowBack } from "react-icons/md";
import { reduxHistorySelector } from "src/redux/history";
import AppLogoImage from "src/view/assets/svg/horizontal.svg";
import { Routes } from "src/view/constants/router";
import { useAuth } from "src/view/hooks/useAuth";
import { NavBarUser } from "src/view/user/NavBarUser";
import styled from "styled-components";

type Props = {
    canGoBack?: boolean;
    onBack?: () => void;
};

export const NavBar = ({ canGoBack }: Props) => {
    const router = useRouter();
    const { historyStack } = reduxHistorySelector();
    const { user, signInWithGoogle, logout } = useAuth();

    const handleOnBack = async () => {
        const isHome = router.pathname === "/";
        if (isHome) return;

        // 一つ前のページがporotoのページでない
        if (historyStack.length <= 1) {
            await router.push("/");
            return;
        }

        await router.back();
    };

    return (
        <NavBarComponent
            canGoBack={canGoBack}
            onBack={handleOnBack}
            userComponent={
                process.env.APP_ENV !== "production" && (
                    <NavBarUser
                        user={user}
                        onLogin={signInWithGoogle}
                        onLogout={logout}
                    />
                )
            }
        />
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
        <Container>
            <HStack w="100%" maxW="990px" spacing={4}>
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
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    background-color: white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 8px 16px;
    font-size: 0.95rem;
    height: 50px;
    width: 100%;
`;

const AppLogo = () => {
    return (
        <Link href={Routes.home} style={{ height: "100%" }}>
            <Box h="100%">
                <AppLogoImage
                    viewBox={
                        "0 0 200 50" /*オリジナルのSVGのviewBoxと合わせている*/
                    }
                    width="calc(33 / 50 * 200)px"
                    height="100%"
                />
            </Box>
        </Link>
    );
};
