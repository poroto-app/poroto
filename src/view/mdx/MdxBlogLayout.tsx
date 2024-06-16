import {
    Avatar,
    Box,
    Center,
    HStack,
    Image,
    Text,
    VStack,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { MDXBlogProvider } from "src/view/mdx/MDXBlogProvider";
import { MdxMeta } from "src/view/mdx/MdxMeta";
import { NavBar } from "src/view/navigation/NavBar";
import { TransactFn } from "store2";

type Props = {
    children?: ReactNode;
    meta: MdxMeta;
};

export function MdxBlogLayout({ children, meta }: Props) {
    return (
        <MDXBlogProvider>
            <VStack w="100%" h="100%" spacing={0}>
                <NavBar />
                <Center w="100%" h="100%" pb="32px">
                    <VStack
                        w="100%"
                        h="100%"
                        maxW="620px"
                        alignItems="flex-start"
                    >
                        <Header meta={meta} />
                        <Box w="100%" px="16px" pb="32px">
                            {children}
                        </Box>
                    </VStack>
                </Center>
            </VStack>
        </MDXBlogProvider>
    );
}

const formatDate = (t: TransactFn, dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = ("0" + date.getHours()).slice(-2);
    const minute = ("0" + date.getMinutes()).slice(-2);
    // @ts-ignore
    return t("common:YYYYMMDDHHMM", {
        year,
        month,
        day,
        hour,
        minute,
    });
};

const Header = ({ meta }: { meta: MdxMeta }) => {
    const { t } = useTranslation();
    return (
        <VStack w="100%" alignItems="flex-start">
            <Image src={meta.image} w="100%" mt={{ base: 0, sm: "32px" }} />
            <Text
                as="h1"
                fontSize="20px"
                fontWeight="bold"
                color="#08131a"
                mt="30px"
                px="16px"
            >
                {meta.title}
            </Text>
            <HStack w="100%" my="16px" px="16px">
                <Avatar src={meta.authorImage} name={meta.author} size="md" />
                <VStack alignItems="flex-start" spacing={0}>
                    <Text>{meta.author}</Text>
                    <Text color="rgba(0,0,0,.6)">
                        {formatDate(t, meta.date)}
                    </Text>
                </VStack>
            </HStack>
        </VStack>
    );
};
