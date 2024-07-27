import { IconProps } from "@tamagui/helpers-icon";
import { NamedExoticComponent, ReactNode } from "react";
import { Link } from "solito/link";
import { Padding } from "src/constant/padding";
import { Text, YStack } from "tamagui";

type Props = {
    title: ReactNode;
    icon: NamedExoticComponent<IconProps>;
    link: string;
    onClick?: () => void;
};

export function CreatePlanButton({ title, icon: Icon, link, onClick }: Props) {
    return (
        <Link
            href={link}
            viewProps={{ style: { width: "100%", flex: 1 } }}
            onClick={onClick}
        >
            <YStack
                borderRadius={20}
                backgroundColor="#FFF8F3"
                w="100%"
                h={180}
                p={28}
                alignItems="center"
                justifyContent="center"
            >
                <Icon
                    color="rgba(22, 19, 17, .8)"
                    paddingBottom={Padding.p8}
                    width={64}
                    height={64}
                />
                <Text
                    color="rgba(22, 19, 17, .8)"
                    fontWeight="bold"
                    whiteSpace="nowrap"
                    textAlign="center"
                >
                    {title}
                </Text>
            </YStack>
        </Link>
    );
}
