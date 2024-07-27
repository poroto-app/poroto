import { Link } from "@chakra-ui/next-js";
import { Center, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { IconType } from "react-icons";
import { MdAccountCircle, MdHome, MdSearch } from "react-icons/md";
import { Routes } from "src/constant/router";
import { Size } from "src/constant/size";

type Props = {
    page: NavigationPage;
};

export const BottomNavigationPages = {
    Home: "Home",
    Search: "Search",
    Account: "Account",
};
export type NavigationPage =
    (typeof BottomNavigationPages)[keyof typeof BottomNavigationPages];

export function BottomNavigation({ page }: Props) {
    const { t } = useTranslation();
    return (
        <Center
            as="nav"
            backgroundColor="white"
            borderTop="1px solid #EBEBEB"
            h={Size.BottomNavigation.height + "px"}
            w="100%"
            px="16px"
            py="8px"
        >
            <HStack w="100%" maxW="600px">
                <NavigationItem
                    icon={MdHome}
                    label={t("navigation:home")}
                    link={Routes.home}
                    isActive={page === BottomNavigationPages.Home}
                />
                <NavigationItem
                    icon={MdSearch}
                    label={t("navigation:search")}
                    link={Routes.search}
                    isActive={page === BottomNavigationPages.Search}
                />
                <NavigationItem
                    icon={MdAccountCircle}
                    label={t("navigation:myPage")}
                    link={Routes.account}
                    isActive={page === BottomNavigationPages.Account}
                />
            </HStack>
        </Center>
    );
}

export function NavigationItem({
    icon,
    label,
    link,
    isActive,
}: {
    icon: IconType;
    label: string;
    link: string;
    isActive: boolean;
}) {
    return (
        <Link href={link} flex={1}>
            <VStack color={isActive ? "#BF756F" : "#6A6A6A"} spacing={0}>
                <Icon w="24px" h="24px" as={icon} />
                <Text fontSize="0.625rem">{label}</Text>
            </VStack>
        </Link>
    );
}
