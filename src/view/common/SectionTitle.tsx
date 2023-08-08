import { Text } from "@chakra-ui/react";

export function SectionTitle({ title }: { title: string }) {
    return (
        <Text fontWeight="bold" fontSize="20px">
            {title}
        </Text>
    );
}
