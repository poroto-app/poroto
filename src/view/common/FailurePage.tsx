import { Box, Center, Text, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { NavBar } from "src/view/common/NavBar";
import { Colors } from "src/view/constants/color";

export type Props = {
    title: string;
    statusMessage?: string;
    statusDescription?: string;
    description?: ReactNode;

    image: ReactNode;

    actions?: ReactNode;

    navBar?: ReactNode;
};

export function FailurePage(
    {
        title,
        statusMessage,
        statusDescription,
        description,
        image,
        actions,
        navBar = <NavBar />,
    }: Props
) {
    return (
        <VStack w="100%" h="100%">
            {navBar}
            <Center w="100%" h="100%" py="32px" px="16px">
                <VStack w="100%" h="100%" maxW="600px">
                    <Center flexDirection="column" flex={1} w="100%" px="16px">
                        <Header
                            title={title}
                            statusMessage={statusMessage}
                            statusDescription={statusDescription}
                        />
                        <ErrorImage image={image} />
                        <VStack
                            spacing={0}
                            w="100%"
                            alignItems="center"
                            color="rgba(0,0,0,.6)"
                        >
                            {description}
                        </VStack>
                    </Center>
                    <VStack w="100%">{actions}</VStack>
                </VStack>
            </Center>
        </VStack>
    );
}

function Header(
    {
        title,
        statusMessage,
        statusDescription,
    }: {
        title: string;
        statusMessage?: string;
        statusDescription?: string;
    }
) {
    return (
        <VStack
            color={Colors.primary["400"]}
            w="100%"
            alignItems="flex-start"
            spacing={0}
        >
            {statusMessage && (
                <Text fontSize="32px" lineHeight={1}>
                    {statusMessage}
                </Text>
            )}
            <Text fontSize="80px" lineHeight={1} fontWeight="bold">
                {title}
            </Text>
            {statusDescription && (
                <Text color="rgba(0,0,0,.6)" mt="16px">
                    {statusDescription}
                </Text>
            )}
            <Center w="100%"></Center>
        </VStack>
    );
}

function ErrorImage({ image }: { image: ReactNode }) {
    return (
        <Center w="100%">
            <Box w="100%" maxW="450px" my="32px">
                {image}
            </Box>
        </Center>
    );
}
