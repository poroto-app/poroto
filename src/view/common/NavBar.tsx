import { Box, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode } from "react";
import AppLogoImage from "src/view/assets/svg/horizontal.svg";
import { Routes } from "src/view/constants/router";
import { useAuth } from "src/view/hooks/useAuth";
import { NavBarUser } from "src/view/user/NavBarUser";
import styled from "styled-components";

export const NavBar = () => {
    const { user, signInWithGoogle, logout } = useAuth();

    return (
        <NavBarComponent
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
    userComponent,
}: {
    userComponent?: ReactNode;
}) => {
    return (
        <Container>
            <HStack w="100%" maxW="990px" spacing={4}>
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
