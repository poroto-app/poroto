import styled from "styled-components";
import {HStack, Icon, Text} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {MdArrowBack, MdOutlinePlace} from "react-icons/md";
import {reduxHistorySelector} from "src/redux/history";

type Props = {
    title?: string
}

export const NavBar = ({title}: Props) => {
    const router = useRouter();
    const [isHome, setIsHome] = useState(false);

    useEffect(() => {
        setIsHome(router.pathname === "/");
    }, [router.pathname]);

    const handleOnBack = async () => {
        const isHome = router.pathname === "/";
        if (isHome) return;

        // TODO: ホーム以外のページに直接来たときに、
        // 通常の戻る操作ではなく、ホームに飛ばすようにする。
        // (直接来た場合は、戻るボタンを押した場合、その前に見ていたページに遷移するため)
        await router.back();
    }

    // const router = useRouter();
    return <NavBarComponent
        title={title}
        canBack={!isHome}
        onBack={handleOnBack}
    />
}

export const NavBarComponent = ({title, canBack, onBack}: Props & {
    canBack: boolean,
    onBack: () => void,
}) => {
    return <Container>
        <HStack w="100%" maxW="990px" spacing={4}>
            {
                canBack && <Icon
                    w="20px" h="20px" as={MdArrowBack}
                    cursor="pointer"
                    onClick={onBack}
                />
            }
            {
                title && <Text fontSize="18px" userSelect="none">{title}</Text>
            }
        </HStack>
    </Container>
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  padding: 8px 16px;
  font-size: 0.95rem;
  width: 100%;
`;