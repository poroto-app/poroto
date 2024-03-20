import { Text, VStack } from "@chakra-ui/react";

type Props = {
    title: string;
    description?: string;
};
export function SectionTitle({ title, description }: Props) {
    return (
        <VStack alignItems="flex-start" spacing="4px">
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
