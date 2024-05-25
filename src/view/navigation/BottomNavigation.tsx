import { Link } from "@chakra-ui/next-js";
import { HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { MdAccountCircle, MdHome, MdSearch } from "react-icons/md";
import { Routes } from "src/view/constants/router";

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
    return (
        <HStack
            backgroundColor="white"
            borderTop="1px solid #EBEBEB"
            w="100%"
            px="16px"
            py="8px"
        >
            <NavigationItem
                icon={MdHome}
                label="ホーム"
                link={Routes.home}
                isActive={page === BottomNavigationPages.Home}
            />
            <NavigationItem
                icon={MdSearch}
                label="探す"
                link={Routes.search}
                isActive={page === BottomNavigationPages.Search}
            />
            <NavigationItem
                icon={MdAccountCircle}
                label="マイページ"
                link={Routes.account}
                isActive={page === BottomNavigationPages.Account}
            />
        </HStack>
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
