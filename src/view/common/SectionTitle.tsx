import { Text, VStack } from "@chakra-ui/react";

type Props = {
    title: string;
    description?: string;
    px?: string | number;
};
export function SectionTitle({ title, px, description }: Props) {
    return (
        <VStack alignItems="flex-start" px={px} spacing="4px">
            <Text fontWeight="bold" fontSize="20px">
                {title.split("\n").map((line, index) => (
                    <span key={index}>
                        {line}
                        <br />
                    </span>
                ))}
            </Text>
            {description && (
                <Text fontSize="14px" color="gray.500">
                    {description}
                </Text>
            )}
        </VStack>
    );
}
