import { Box, HStack, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { reduxHistorySelector } from "src/redux/history";
import AppLogoImage from "src/view/assets/svg/horizontal.svg";
import { useAuth } from "src/view/hooks/useAuth";
import { NavBarUser } from "src/view/user/NavBarUser";
import styled from "styled-components";

type Props = {
    title?: string;
};

export const NavBar = ({ title }: Props) => {
    const router = useRouter();
    const [isHome, setIsHome] = useState(false);
    const { historyStack } = reduxHistorySelector();
    const { user, signInWithGoogle, logout } = useAuth();

    useEffect(() => {
        setIsHome(router.pathname === "/");
    }, [router.pathname]);

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
            title={title}
            canBack={!isHome}
            onBack={handleOnBack}
            userComponent={
                process.env.NODE_ENV !== "production" && (
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
    title,
    canBack,
    userComponent,
    onBack,
}: Props & {
    canBack: boolean;
    onBack: () => void;
    userComponent?: ReactNode;
}) => {
    return (
        <Container>
            <HStack w="100%" maxW="990px" spacing={4}>
                {canBack && (
                    <Icon
                        w="20px"
                        h="20px"
                        as={MdArrowBack}
                        cursor="pointer"
                        onClick={onBack}
                    />
                )}
                <HStack flex={1} h="100%" justifyContent="flex-start" overflow="hidden">
                    {!title && <AppLogo />}
                    {title && (
                        <Text
                            flex={1}
                            fontSize="18px"
                            userSelect="none"
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                            overflow="hidden"
                        >
                            {title}
                        </Text>
                    )}
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
        <Box h="100%">
            <AppLogoImage
                viewBox={
                    "0 0 200 50" /*オリジナルのSVGのviewBoxと合わせている*/
                }
                width="calc(33 / 50 * 200)px"
                height="100%"
            />
        </Box>
    );
};
