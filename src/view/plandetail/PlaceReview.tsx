import { Avatar, HStack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

export type Props = {
    authorName: string;
    authorUrl: string;
    authorPhotoUrl?: string;
    text: string;
};

export function PlaceReview({
    authorName,
    authorUrl,
    authorPhotoUrl,
    text,
}: Props) {
    return (
        <VStack
            w="100%"
            h="100%"
            px="16px"
            py="8px"
            borderRadius="10px"
            alignItems="flex-start"
            backgroundColor="#FCE9D3"
        >
            <HStack w="100%" spacing="8px">
                <Link href={authorUrl}>
                    <Avatar
                        size="sm"
                        src={authorPhotoUrl}
                        name={authorName}
                        my="4px"
                    />
                </Link>
                <Text color="rgba(0,0,0,.6)">{authorName}</Text>
            </HStack>
            <Text
                color="rgba(0,0,0,.8)"
                h="100%"
                overflowY="scroll"
                sx={{
                    "::-webkit-scrollbar": {
                        display: "none",
                    },
                }}
            >
                {text}
            </Text>
        </VStack>
    );
}
