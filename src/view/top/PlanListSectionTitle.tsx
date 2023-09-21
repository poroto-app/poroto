import { Box, Center, HStack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

type Props = {
    section: PlanSection;
};

export const PlanSections = {
    NearBy: "nearby",
    Recent: "recent",
};
export type PlanSection = (typeof PlanSections)[keyof typeof PlanSections];

export function PlanListSectionTitle({ section }: Props) {
    return (
        <HStack
            id={`${section}`}
            py="48px"
            px="16px"
            w="100%"
            justifyContent="center"
            spacing={4}
        >
            <Title
                prefix="あなたの近くの"
                title="おすすめのプラン"
                section={PlanSections.NearBy}
                currentSection={section}
            />
            <Title
                prefix="全国各地の"
                title="注目のプラン"
                section={PlanSections.Recent}
                currentSection={section}
            />
        </HStack>
    );
}

function Title({
    title,
    prefix,
    section,
    currentSection,
}: {
    title: string;
    prefix: string;
    section: PlanSection;
    currentSection?: PlanSection;
}) {
    return (
        <Link href={`#${section}`}>
            <VStack
                alignItems="flex-start"
                color={section !== currentSection && "gray"}
                userSelect="none"
            >
                <Text lineHeight={1}>{prefix}</Text>
                <Text fontSize="20px" fontWeight="bold" lineHeight={1} as="h1">
                    {title}
                </Text>
                <Center
                    w="100%"
                    px="16px"
                    mt="8px"
                    opacity={section === currentSection ? 1 : 0}
                >
                    <Box
                        w="90px"
                        border="2px solid #222222"
                        borderRadius="20px"
                    />
                </Center>
            </VStack>
        </Link>
    );
}
