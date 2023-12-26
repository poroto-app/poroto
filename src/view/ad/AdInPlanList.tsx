import { Box, Center, Text } from "@chakra-ui/react";
import { GoogleAdsense } from "./GoogleAdsense";

export function AdInPlanList() {
    return (
        <Box gridColumn="1 / -1">
            <AdComponent />
        </Box>
    );
}

function AdComponent() {
    if (process.env.APP_ENV !== "production") {
        return (
            <Center
                w="100%"
                h="100%"
                minH="200px"
                maxW="100%"
                backgroundColor="#EEEEEE"
                userSelect="none"
            >
                <Text>Infeed</Text>
            </Center>
        );
    }

    return (
        // 記事内広告では、最低50pxの高さが必要
        <GoogleAdsense
            format="fluid"
            parentStyle={{ width: "100%", height: "100%" }}
            style={{
                margin: "0 auto",
                minHeight: "200px",
                textAlign: "center",
            }}
            layout="in-article"
            slot={process.env.ADSENSE_SLOT_TOP_PAGE_IN_ARTICLE}
        />
    );
}
