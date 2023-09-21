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
        <HStack
            w="100%"
            backgroundColor="rgb(46 46 64 / 3%)"
            px="8px"
            py="8px"
            borderRadius="15px"
            alignItems="flex-start"
        >
            <Link href={authorUrl}>
                <Avatar
                    size="sm"
                    src={authorPhotoUrl}
                    name={authorName}
                    my="4px"
                />
            </Link>
            <VStack alignItems="flex-start" spacing={0}>
                <Text color="rgba(0,0,0,.6)">{authorName}</Text>
                <Text>{text}</Text>
            </VStack>
        </HStack>
    );
}