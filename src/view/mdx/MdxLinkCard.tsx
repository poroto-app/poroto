import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Response as OpenGraphResponse } from "src/pages/api/v1/openGraph";

type Props = {
    href: string;
};

type OpenGraphData = {
    url: string;
    title: string | null;
    description: string | null;
    image: string | null;
};

export function MdxLinkCard({ href }: Props) {
    const [ogData, setOgData] = useState<OpenGraphData | null>(null);

    useEffect(() => {
        axios
            .post("/api/v1/openGraph", {
                url: href,
            })
            .then((res) => {
                const ogData = res.data as OpenGraphResponse;
                setOgData({
                    url: ogData.url,
                    title: ogData.title,
                    description: ogData.description,
                    image: ogData.image,
                });
            })
            .catch((err) => {
                if (process.env.NODE_ENV === "development") {
                    console.error(err);
                }
                setOgData(null);
            });
    }, []);

    if (!ogData) return <Link href={href} />;

    return (
        <Link href={href}>
            <HStack
                w="100%"
                border="1px solid rgba(8,19,26,0.1)"
                borderRadius="5px"
            >
                <VStack
                    alignItems="flex-start"
                    justifyContent="center"
                    flex="4 1 180px"
                    p="16px"
                >
                    <Text>{ogData && ogData.title}</Text>
                    <Text
                        color="rgba(0,0,0,.6)"
                        maxH="3em"
                        overflow="hidden"
                        wordBreak="break-all"
                    >
                        {ogData && ogData.description}
                    </Text>
                </VStack>
                <Box backgroundColor="gray" flex="1 1 180px">
                    {ogData && ogData.image && (
                        <Image
                            src={ogData.image}
                            alt="og image"
                            w="100%"
                            h="100%"
                        />
                    )}
                </Box>
            </HStack>
        </Link>
    );
}
