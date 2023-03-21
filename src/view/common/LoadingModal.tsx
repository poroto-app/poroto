import {Center, Text, VStack} from "@chakra-ui/react";

type Props = {
    title: string
}

export const LoadingModal = ({title}: Props) => {
    return <Center
        w="100%" h="100%"
        backgroundColor="F7F5EE"
        position="fixed" top={0} right={0} bottom={0} left={0}
    >
        <VStack>
            <img src="/images/logo.svg" alt="logo"/>
            <Text mt="8px">{title}</Text>
        </VStack>
    </Center>
}