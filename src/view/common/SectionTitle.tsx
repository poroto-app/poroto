import { Text } from "@chakra-ui/react";

export function SectionTitle({ title }: { title: string }) {
    return (
        <Text fontWeight="bold" fontSize="20px">
            {title.split("\n").map((line, index) => (
                <span key={index}>
                    {line}
                    <br />
                </span>
            ))}
        </Text>
    );
}
