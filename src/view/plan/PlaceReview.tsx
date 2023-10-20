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
        <HStack w="100%" borderRadius="15px" alignItems="flex-start">
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
                <Text color="rgba(0,0,0,.8)">{text}</Text>
            </VStack>
        </HStack>
    );
}
