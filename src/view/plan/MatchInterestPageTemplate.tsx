import { VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { MessageCard } from "src/view/plan/MessageCard";

type Props = {
    message: string;
    navBar: ReactNode;
    children?: ReactNode;
};

export function MatchInterestPageTemplate(
    { message, navBar, children }: Props
) {
    return (
        <VStack h="100%" w="100%" spacing={0}>
            {navBar}
            <VStack
                flex={1}
                h="100%"
                w="100%"
                maxWidth="990px"
                px="16px"
                pt="8px"
                pb={{ base: "64px", sm: "32px" }}
            >
                <MessageCard message={message} />
                {children}
            </VStack>
        </VStack>
    );
}
