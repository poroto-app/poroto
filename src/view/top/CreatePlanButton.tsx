import { Link } from "@chakra-ui/next-js";
import { Icon, Text, VStack } from "@chakra-ui/react";
import { IconType } from "react-icons";

type Props = {
    title: string;
    icon: IconType;
    link: string;
};

export function CreatePlanButton({ title, icon, link }: Props) {
    return (
        <Link href={link} w="100%">
            <VStack
                borderRadius="20px"
                backgroundColor="#FFF8F3"
                w="100%"
                h="100%"
                p="28px"
                justifyContent="center"
            >
                <Icon
                    color="rgba(22, 19, 17, .8)"
                    as={icon}
                    w="64px"
                    h="64px"
                />
                <Text
                    color="rgba(22, 19, 17, .8)"
                    fontWeight="bold"
                    whiteSpace="nowrap"
                >
                    {title}
                </Text>
            </VStack>
        </Link>
    );
}
