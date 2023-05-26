import { Center, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import styled, { keyframes } from "styled-components";

type Props = {
    title: string;
};

export const LoadingModal = ({ title }: Props) => {
    return (
        <Center
            w="100%"
            h="100%"
            backgroundColor="F7F5EE"
            position="fixed"
            top={0}
            right={0}
            bottom={0}
            left={0}
        >
            <VStack spacing={8}>
                <FadeInFadeOutTransition>
                    <Image
                        width={100}
                        height={100}
                        src="/images/logo.svg"
                        alt="logo"
                    />
                </FadeInFadeOutTransition>
                <Text
                    px="16px"
                    maxW="100%"
                    fontSize="1.25rem"
                    bgGradient="linear(45deg, #4E6382, #BBA0A6)"
                    bgClip="text"
                >
                    {title}
                </Text>
            </VStack>
        </Center>
    );
};

const fadeinFadeOut = keyframes`
  0% {
    opacity: .1;
  }

  to {
    opacity: 1;
  }
`;

const rotate = keyframes`
  0% {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
`;

const FadeInFadeOutTransition = styled.div`
    animation: ${fadeinFadeOut} 0.75s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            alternate-reverse infinite,
        ${rotate} 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
`;
